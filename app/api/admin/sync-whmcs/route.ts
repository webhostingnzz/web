import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { getWhmcsProducts, getWhmcsTldPricing } from '../../../lib/whmcsApi';

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export async function POST() {
  const supabase = getSupabaseAdmin();
  const results = {
    pricingPlansUpdated: [] as string[],
    customItemsUpdated: [] as string[],
    domainsUpdated: [] as string[],
    unmatchedWhmcsProducts: [] as string[],
    errors: [] as string[],
  };

  // --- Sync named plans (Web Hosting / WordPress / Website Builder) ---
  let whmcsProducts: Awaited<ReturnType<typeof getWhmcsProducts>> = [];
  try {
    whmcsProducts = await getWhmcsProducts();
  } catch (err: any) {
    return NextResponse.json({ error: `Failed to reach WHMCS: ${err.message}` }, { status: 500 });
  }

  const productByName = new Map(whmcsProducts.map((p) => [normalize(p.name), p]));
  const matchedNames = new Set<string>();

  try {
    const { data: plans } = await supabase.from('pricing_plans').select('id, plan_name');
    for (const plan of plans || []) {
      const match = productByName.get(normalize(plan.plan_name));
      if (match && match.monthlyPrice !== null) {
        await supabase.from('pricing_plans').update({ monthly_price: match.monthlyPrice }).eq('id', plan.id);
        results.pricingPlansUpdated.push(`${plan.plan_name} → NZ$${match.monthlyPrice}`);
        matchedNames.add(normalize(plan.plan_name));
      }
    }
  } catch (err: any) {
    results.errors.push(`pricing_plans sync error: ${err.message}`);
  }

  // --- Sync VPS tiers and Cloud Server plans (all live in custom_pricing_items) ---
  try {
    const { data: items } = await supabase
      .from('custom_pricing_items')
      .select('id, item_name, category')
      .neq('category', 'web_design')
      .neq('category', 'domain_tld');
    for (const item of items || []) {
      const match = productByName.get(normalize(item.item_name));
      if (match && match.monthlyPrice !== null) {
        await supabase.from('custom_pricing_items').update({ price: match.monthlyPrice }).eq('id', item.id);
        results.customItemsUpdated.push(`${item.item_name} (${item.category}) → NZ$${match.monthlyPrice}`);
        matchedNames.add(normalize(item.item_name));
      }
    }
  } catch (err: any) {
    results.errors.push(`custom_pricing_items sync error: ${err.message}`);
  }

  for (const p of whmcsProducts) {
    if (!matchedNames.has(normalize(p.name))) {
      results.unmatchedWhmcsProducts.push(p.name);
    }
  }

  // --- Sync domain TLD pricing ---
  try {
    const tldPricing = await getWhmcsTldPricing();
    const tldByName = new Map(tldPricing.map((t) => [t.tld.replace(/^\./, '').toLowerCase(), t]));
    const { data: domains } = await supabase
      .from('custom_pricing_items')
      .select('id, item_name')
      .eq('category', 'domain_tld');
    for (const d of domains || []) {
      const match = tldByName.get(d.item_name.replace(/^\./, '').toLowerCase());
      if (match && match.registerPrice !== null) {
        await supabase.from('custom_pricing_items').update({ price: match.registerPrice }).eq('id', d.id);
        results.domainsUpdated.push(`${d.item_name} → NZ$${match.registerPrice}`);
      }
    }
  } catch (err: any) {
    results.errors.push(`Domain TLD sync error: ${err.message}`);
  }

  return NextResponse.json(results);
}
