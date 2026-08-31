import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { SEO_PAGES } from '../../../lib/seoPages';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('seo_settings').select('*');
    if (error) throw error;

    const overrides = new Map((data || []).map((row: any) => [row.page_slug, row]));

    const pages = SEO_PAGES.map((p) => {
      const override = overrides.get(p.slug);
      return {
        slug: p.slug,
        route: p.route,
        label: p.label,
        title: override?.meta_title || p.fallbackTitle,
        description: override?.meta_description || p.fallbackDescription,
        hasOverride: !!override,
      };
    });

    return NextResponse.json({ pages });
  } catch (err: any) {
    console.error('SEO fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, description } = body;
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('seo_settings')
      .upsert({ page_slug: slug, meta_title: title, meta_description: description }, { onConflict: 'page_slug' });

    if (error) throw error;

    const pageDef = SEO_PAGES.find((p) => p.slug === slug);
    if (pageDef) revalidatePath(pageDef.route);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('SEO update error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
