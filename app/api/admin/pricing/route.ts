import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '../../../lib/supabase';

// Maps each pricing_plans "page" value to the actual site route that
// displays it, so a save can immediately refresh the right cached page
// instead of waiting for the next full deploy.
const PAGE_TO_ROUTE: Record<string, string> = {
  web_hosting: '/web-hosting',
  wordpress_hosting: '/wordpress-hosting',
  website_builder_hosting: '/website-builder-hosting',
};

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
    const { data, error } = await supabase
      .from('pricing_plans')
      .update({ plan_name, monthly_price, features, order_link, image_url })
      .eq('id', id)
      .select('page')
      .single();

    if (error) throw error;

    const route = data?.page ? PAGE_TO_ROUTE[data.page] : undefined;
    if (route) revalidatePath(route);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Pricing update error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
