import type { CustomPricingItem } from './getCustomPricing';

// Regenerates the 3 featured TLD price widgets (.co.nz, .com, .net) from
// live database data. Each TLD's price and "Previously $X" text are
// replaced independently — a TLD with no matching database row is left
// completely untouched.
export function applyDomainPriceOverride(html: string, tlds: CustomPricingItem[]): string {
  if (!tlds || tlds.length === 0) return html;

  let result = html;
  for (const tld of tlds) {
    const escapedTld = tld.item_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
      `(<p>${escapedTld}</p>[\\s\\S]{0,500}?<p class="elementor-heading-title[^"]*">NZ\\$\\s*)[0-9.]+(/\\s*yr</p>[\\s\\S]{0,500}?<p>Previously\\s*)[0-9.]+(</p>)`
    );
    if (tld.original_price !== null) {
      result = result.replace(pattern, `$1${tld.price.toFixed(2)}$2${tld.original_price.toFixed(2)}$3`);
    } else {
      // No "was" price for this TLD — only replace the current price
      const simplePattern = new RegExp(
        `(<p>${escapedTld}</p>[\\s\\S]{0,500}?<p class="elementor-heading-title[^"]*">NZ\\$\\s*)[0-9.]+(/\\s*yr</p>)`
      );
      result = result.replace(simplePattern, `$1${tld.price.toFixed(2)}$2`);
    }
  }
  return result;
}
