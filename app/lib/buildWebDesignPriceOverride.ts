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
    // IMPORTANT: use a replacement FUNCTION, not a replacement string.
    // A string like `$1$${priceInt}$2` gets re-parsed by the regex engine
    // itself — "$" followed by digits is special replacement syntax
    // (backreferences), so digits from the price number can accidentally
    // be swallowed as fake group references, corrupting the output (e.g.
    // 119 silently became 19). A function's return value is inserted
    // literally with no such reinterpretation.
    result = result.replace(pattern, (_match, before, after) => `${before}$${priceInt}${after}`);
  }
  return result;
}
