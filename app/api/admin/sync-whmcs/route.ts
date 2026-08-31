import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { getWhmcsProducts, getWhmcsTldPricing } from '../../../lib/whmcsApi';

const PAGE_TO_ROUTE: Record<string, string> = {
  web_hosting: '/web-hosting',
  wordpress_hosting: '/wordpress-hosting',
  website_builder_hosting: '/website-builder-hosting',
};

const CATEGORY_TO_ROUTE: Record<string, string> = {
  vps: '/vps-hosting',
  cloud_servers_webhosting_nz: '/cloud-servers',
  cloud_servers_aws: '/cloud-servers',
  cloud_servers_gcp: '/cloud-servers',
  web_design: '/web-design-service',
  domain_tld: '/domain',
};

function normalize(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

// WHMCS names these products more verbosely than what's actually shown on
// the site (e.g. WHMCS: "Webhosting NZ Micro Server" vs. displayed: "Micro"
// — the site's table is already titled "Webhosting NZ", so repeating it in
// every row would be redundant). Rather than rename what's displayed on the
// live site, we strip the known prefix/suffix words from the WHMCS side
// before comparing, per category.
const CATEGORY_STRIP: Record<string, { prefix?: string; suffix?: string }> = {
  vps: { suffix: ' vps' },
  cloud_servers_webhosting_nz: { prefix: 'webhosting nz ', suffix: ' server' },
  cloud_servers_aws: { prefix: 'aws ', suffix: ' server' },
  cloud_servers_gcp: { prefix: 'gcp ', suffix: ' server' },
};

function canonicalForCategory(whmcsProductName: string, category: string): string {
  let n = normalize(whmcsProductName);
  const strip = CATEGORY_STRIP[category];
  if (strip?.prefix && n.startsWith(strip.prefix)) n = n.slice(strip.prefix.length);
  if (strip?.suffix && n.endsWith(strip.suffix)) n = n.slice(0, -strip.suffix.length);
  return n.trim();
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

  // Every route that changed during this sync — refreshed all at once at
  // the end, so a page that had multiple updates only gets revalidated
  // once rather than repeatedly.
  const routesToRevalidate = new Set<string>();

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
    const { data: plans } = await supabase.from('pricing_plans').select('id, plan_name, page');
    for (const plan of plans || []) {
      const match = productByName.get(normalize(plan.plan_name));
      if (match && match.monthlyPrice !== null) {
        await supabase.from('pricing_plans').update({ monthly_price: match.monthlyPrice }).eq('id', plan.id);
        results.pricingPlansUpdated.push(`${plan.plan_name} → NZ$${match.monthlyPrice}`);
        matchedNames.add(normalize(plan.plan_name));
        if (PAGE_TO_ROUTE[plan.page]) routesToRevalidate.add(PAGE_TO_ROUTE[plan.page]);
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

    // Build a category-aware lookup: for each product, compute its
    // canonical (stripped) name under every category that has a strip
    // rule, so "Webhosting NZ Micro Server" becomes findable as "micro"
    // specifically when checking cloud_servers_webhosting_nz items.
    const categoryProductMaps: Record<string, Map<string, typeof whmcsProducts[number]>> = {};
    for (const category of Object.keys(CATEGORY_STRIP)) {
      categoryProductMaps[category] = new Map(
        whmcsProducts.map((p) => [canonicalForCategory(p.name, category), p])
      );
    }

    for (const item of items || []) {
      const categoryMap = categoryProductMaps[item.category];
      const match = categoryMap ? categoryMap.get(normalize(item.item_name)) : productByName.get(normalize(item.item_name));
      if (match && match.monthlyPrice !== null) {
        await supabase.from('custom_pricing_items').update({ price: match.monthlyPrice }).eq('id', item.id);
        results.customItemsUpdated.push(`${item.item_name} (${item.category}) → NZ$${match.monthlyPrice}`);
        matchedNames.add(normalize(match.name));
        if (CATEGORY_TO_ROUTE[item.category]) routesToRevalidate.add(CATEGORY_TO_ROUTE[item.category]);
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
        routesToRevalidate.add('/domain');
      }
    }
  } catch (err: any) {
    results.errors.push(`Domain TLD sync error: ${err.message}`);
  }

  for (const route of routesToRevalidate) {
    revalidatePath(route);
  }

  return NextResponse.json(results);
}
