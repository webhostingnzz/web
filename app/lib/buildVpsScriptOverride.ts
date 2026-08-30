import type { CustomPricingItem } from './getCustomPricing';

// Regenerates the VPS slider's JS array declarations (cpu/ram/storage/
// bandwidth/price/order-link per tier) from live database data, and splices
// them into the page's script text in place of the originally hardcoded
// ones — before the script actually runs. This is done as a targeted
// string replacement (not a rewrite of the slider itself) specifically
// because the slider's jQuery UI wiring was fragile to get working
// correctly, and this way its own logic is never touched, only the data
// arrays it reads from.
export function applyVpsPricingOverride(scriptText: string, tiers: CustomPricingItem[]): string {
  if (!tiers || tiers.length === 0) return scriptText; // no DB rows yet — leave the original hardcoded arrays alone

  const cpuArr = tiers.map((t) => t.specs.cpu || '').join("', '");
  const ramArr = tiers.map((t) => t.specs.ram || '').join("', '");
  const hddArr = tiers.map((t) => t.specs.storage || '').join("', '");
  const bandwidthArr = tiers.map((t) => t.specs.bandwidth || '').join("', '");
  const priceIntArr = tiers.map((t) => String(Math.floor(t.price))).join("', '");
  const priceDecArr = tiers.map((t) => {
    const decimals = Math.round((t.price % 1) * 100);
    return String(decimals).padStart(2, '0');
  }).join("', '");
  const linkArr = tiers.map(() => '$10').join("', '"); // this array is unused decorative content in the original script
  const urlArr = tiers.map((t) => t.order_link || '#').join("', '");

  const oldBlock = /var cpu_arr = new Array\([^)]*\);\s*\n\s*var ram_arr = new Array\([^)]*\);\s*\n\s*var hdd_arr = new Array\([^)]*\);\s*\n\s*var bandwidth_arr = new Array\([^)]*\);\s*\n\s*var ip_arr = new Array\([^)]*\)\s*\n\s*var price_arr = new Array\([^)]*\);\s*\n\s*var decimal_arr = new Array\([^)]*\);\s*\n\s*var link_arr = new Array\([^)]*\);\s*\n\s*var b_url = new Array\([^)]*\);/;

  const newBlock = `var cpu_arr = new Array('${cpuArr}');
			var ram_arr = new Array('${ramArr}');
			var hdd_arr = new Array('${hddArr}');
			var bandwidth_arr = new Array('${bandwidthArr}');
			var ip_arr = new Array('Unlimited')
			var price_arr = new Array('${priceIntArr}');
			var decimal_arr = new Array('${priceDecArr}');
			var link_arr = new Array('${linkArr}');
			var b_url = new Array('${urlArr}');`;

  if (!oldBlock.test(scriptText)) {
    // Structure didn't match exactly (e.g. the original script changed) —
    // safer to leave the original script untouched than risk a broken
    // replacement that only partially matches.
    console.error('VPS pricing override: expected script block not found, using original hardcoded pricing.');
    return scriptText;
  }

  return scriptText.replace(oldBlock, newBlock);
}
