// Fix for the WHMCS pricing widgets (price display + "Order Now" button).
//
// On the original WordPress/Elementor/Hostiko site, these widgets are wired
// up by an external plugin script (hostiko-toolkit/assets/js/hostiko-widget.js)
// that was never part of the scraped page content, so it never made it into
// this Next.js port. As shipped, the price is blank and the "Order Now"
// button is a dead `href="#"` link.
//
// Each plan card looks like this in the ported HTML:
//
//   <div class="elementor-widget-whmcs_product_price">
//     <div class="hostiko-price-outer">
//       <span class="currency"></span>
//       <span class="price"></span>
//       <div class="decimal-outer">
//         <span class="decimal"></span>
//         <span class="duration"></span>
//       </div>
//     </div>
//     <select class="hostiko-select-field">
//       <option data-product="https://my.webhosting.co.nz/store/.../plan"
//               value="monthly" data-prefix="NZ$" data-price="4.49" data-cycle="monthly">...</option>
//       <option data-product="..." value="annually" data-prefix="NZ$" data-price="53.88" data-cycle="annually">...</option>
//     </select>
//   </div>
//   <div class="elementor-widget-whmcs_product_button">
//     <div class="whmcs-product-btn-outer">
//       <a class="whmcs-product-btn" href="#">Order Now</a>
//     </div>
//   </div>
//
// This function:
//   1. Populates the currency/price/decimal/duration spans from the
//      currently selected <option> (defaults to the first option, i.e.
//      "monthly").
//   2. Points the "Order Now" button at that option's WHMCS store URL,
//      with the billing cycle appended as `?billingcycle=monthly|annually`.
//   3. Re-runs both of the above whenever the select's value changes, so
//      switching between monthly/annually keeps the price and the button
//      in sync.
//
// NOTE: the `?billingcycle=` query param is the standard WHMCS cart
// convention, but this project doesn't have direct access to the real
// hostiko-widget.js source to confirm the exact param name used by
// my.webhosting.co.nz's "store" front. Worth a quick check against the
// live site (pick a plan, switch to Annually, click Order Now, and look
// at the resulting URL) to confirm before relying on this in production.

function populatePriceDisplay(select: HTMLSelectElement, priceOuter: Element) {
  const opt = select.options[select.selectedIndex];
  if (!opt) return;

  const prefix = opt.getAttribute('data-prefix') || '';
  const postfix = opt.getAttribute('data-postfix') || '';
  const price = opt.getAttribute('data-price') || '';
  const cycle = opt.getAttribute('value') || opt.getAttribute('data-cycle') || '';

  const currencyEl = priceOuter.querySelector('.currency');
  const priceEl = priceOuter.querySelector('.price');
  const decimalEl = priceOuter.querySelector('.decimal-outer .decimal');
  const durationEl = priceOuter.querySelector('.decimal-outer .duration');

  // Split "4.49" into whole ("4") + decimal (".49") the way the original
  // widget displays it (big whole number, small decimal/duration underneath).
  const [whole, decimal] = String(price).split('.');

  if (currencyEl) currencyEl.textContent = prefix;
  if (priceEl) priceEl.textContent = whole || price;
  if (decimalEl) decimalEl.textContent = decimal ? `.${decimal}${postfix}` : postfix;
  if (durationEl) durationEl.textContent = cycle ? `/${cycle}` : '';
}

function pointOrderButton(select: HTMLSelectElement, btn: HTMLAnchorElement) {
  const opt = select.options[select.selectedIndex];
  if (!opt) return;

  const productUrl = opt.getAttribute('data-product');
  const cycle = opt.getAttribute('value') || opt.getAttribute('data-cycle') || '';
  if (!productUrl) return;

  const separator = productUrl.includes('?') ? '&' : '?';
  btn.setAttribute('href', cycle ? `${productUrl}${separator}billingcycle=${cycle}` : productUrl);
  btn.removeAttribute('data-custom');
  btn.removeAttribute('data-layout');
}

function findOrderButton(priceWidget: Element): HTMLAnchorElement | null {
  // The button widget is normally the very next sibling of the price
  // widget under the same plan card. Walk forward through siblings just
  // in case there's a stray text/comment node in between.
  let sibling: Element | null = priceWidget.nextElementSibling;
  while (sibling) {
    const btn = sibling.querySelector<HTMLAnchorElement>('.whmcs-product-btn');
    if (btn) return btn;
    sibling = sibling.nextElementSibling;
  }

  // Fallback: search within the nearest plan-card wrapper.
  const card = priceWidget.closest('.hosting-shared-inner, .hosting-plans-inner, .hosting-dedicated-inner');
  if (card) {
    return card.querySelector<HTMLAnchorElement>('.whmcs-product-btn');
  }

  return null;
}

export function initHostikoPricingWidgets() {
  document.querySelectorAll('.elementor-widget-whmcs_product_price').forEach((priceWidget) => {
    const select = priceWidget.querySelector<HTMLSelectElement>('select.hostiko-select-field');
    const priceOuter = priceWidget.querySelector('.hostiko-price-outer');
    if (!select || !priceOuter) return;

    const btn = findOrderButton(priceWidget);

    const sync = () => {
      populatePriceDisplay(select, priceOuter);
      if (btn) pointOrderButton(select, btn);
    };

    sync();
    select.addEventListener('change', sync);
  });
}
