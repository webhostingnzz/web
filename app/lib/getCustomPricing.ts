import { getSupabaseAdmin } from './supabase';

export type CustomPricingItem = {
  id: string;
  category: string;
  item_name: string;
  price: number;
  original_price: number | null;
  specs: Record<string, string>;
  order_link: string | null;
  display_order: number;
};

// Fetches all rows for a category, ordered correctly. Returns an empty
// array (not an error) if the table is empty or Supabase is briefly
// unreachable — callers are responsible for falling back to hardcoded
// defaults so the site never breaks.
export async function getCustomPricing(category: string): Promise<CustomPricingItem[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('custom_pricing_items')
      .select('*')
      .eq('category', category)
      .order('display_order', { ascending: true });

    if (error || !data) return [];
    return data.map((row: any) => ({
      id: row.id,
      category: row.category,
      item_name: row.item_name,
      price: Number(row.price),
      original_price: row.original_price !== null ? Number(row.original_price) : null,
      specs: row.specs || {},
      order_link: row.order_link,
      display_order: row.display_order,
    }));
  } catch (err) {
    console.error(`Failed to fetch custom pricing for "${category}":`, err);
    return [];
  }
}
