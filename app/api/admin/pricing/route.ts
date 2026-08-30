import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('page', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ plans: data });
  } catch (err: any) {
    console.error('Pricing fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch pricing plans' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, plan_name, monthly_price, features, order_link, image_url } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('pricing_plans')
      .update({ plan_name, monthly_price, features, order_link, image_url })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Pricing update error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
