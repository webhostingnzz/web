import type { CustomPricingItem } from './getCustomPricing';

// Regenerates the 3 displayed prices on the Web Design Service page from
// live database data, matching whatever Stripe actually charges (see
// getTierPricing in the checkout API route) — so the displayed price and
// the charged price can never drift apart. Falls back to leaving the
// original scraped HTML untouched if there's no data yet.
export function applyWebDesignPriceOverride(html: string, tiers: CustomPricingItem[]): string {
  if (!tiers || tiers.length === 0) return html;

  let result = html;
  for (const tier of tiers) {
    const priceInt = Math.round(tier.price);
    const pattern = new RegExp(
      `(<h3>${tier.item_name}</h3>\\s*<div class="price">)\\$[0-9]+(<span> NZD</span></div>)`
    );
    result = result.replace(pattern, `$1$${priceInt}$2`);
  }
  return result;
}
