import { getSupabaseAdmin } from './supabase';
import type { PricingPageData } from '../data/pricingPlans';
import { webHostingPricing, wordpressHostingPricing, websiteBuilderPricing } from '../data/pricingPlans';

const FALLBACKS: Record<string, PricingPageData> = {
  web_hosting: webHostingPricing,
  wordpress_hosting: wordpressHostingPricing,
  website_builder_hosting: websiteBuilderPricing,
};

export async function getPricingPageData(page: string): Promise<PricingPageData> {
  const fallback = FALLBACKS[page];
  if (!fallback) throw new Error(`Unknown pricing page: ${page}`);

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('page', page)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return {
      ...fallback,
      plans: data.map((row: any) => {
        const monthly = Number(row.monthly_price);
        return {
          name: row.plan_name,
          image: row.image_url,
          features: row.features || [],
          monthlyPrice: monthly.toFixed(2),
          annualPrice: (monthly * 12).toFixed(2),
          currency: 'NZ$',
          orderUrl: row.order_link,
        };
      }),
    };
  } catch (err) {
    console.error(`Failed to fetch pricing plans for "${page}":`, err);
    return fallback;
  }
}
