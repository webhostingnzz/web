import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '../../../lib/supabase';

// Maps each custom_pricing_items "category" to the actual site route that
// displays it, so a save can immediately refresh the right cached page
// instead of waiting for the next full deploy.
const CATEGORY_TO_ROUTE: Record<string, string> = {
  vps: '/vps-hosting',
  cloud_servers_webhosting_nz: '/cloud-servers',
  cloud_servers_aws: '/cloud-servers',
  cloud_servers_gcp: '/cloud-servers',
  web_design: '/web-design-service',
  domain_tld: '/domain',
};

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('custom_pricing_items')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ items: data });
  } catch (err: any) {
    console.error('Custom pricing fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch pricing items' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, item_name, price, original_price, specs, order_link, display_order } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('custom_pricing_items')
      .update({
        item_name,
        price,
        original_price: original_price === '' || original_price === null ? null : original_price,
        specs,
        order_link: order_link === '' ? null : order_link,
        display_order,
      })
      .eq('id', id)
      .select('category')
      .single();

    if (error) throw error;

    const route = data?.category ? CATEGORY_TO_ROUTE[data.category] : undefined;
    if (route) revalidatePath(route);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Custom pricing update error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
