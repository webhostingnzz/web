import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase';

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
    const { error } = await supabase
      .from('custom_pricing_items')
      .update({
        item_name,
        price,
        original_price: original_price === '' || original_price === null ? null : original_price,
        specs,
        order_link: order_link === '' ? null : order_link,
        display_order,
      })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Custom pricing update error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
