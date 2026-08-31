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
      // Use a replacement FUNCTION, not a replacement string — a string
      // like `$1${price}$2${original}$3` gets re-parsed by the regex
      // engine's own "$" + digits backreference syntax, which can
      // silently corrupt the output if the interpolated digits happen to
      // form what looks like another group reference. A function's
      // return value is inserted literally, with no such risk.
      result = result.replace(pattern, (_m, before, between, after) =>
        `${before}${tld.price.toFixed(2)}${between}${tld.original_price!.toFixed(2)}${after}`
      );
    } else {
      // No "was" price for this TLD — only replace the current price
      const simplePattern = new RegExp(
        `(<p>${escapedTld}</p>[\\s\\S]{0,500}?<p class="elementor-heading-title[^"]*">NZ\\$\\s*)[0-9.]+(/\\s*yr</p>)`
      );
      result = result.replace(simplePattern, (_m, before, after) => `${before}${tld.price.toFixed(2)}${after}`);
    }
  }
  return result;
}
