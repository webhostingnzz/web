import { getSupabaseAdmin } from './supabase';
import { SEO_PAGES } from './seoPages';

export async function getSeoMetadata(slug: string) {
  const fallback = SEO_PAGES.find((p) => p.slug === slug);
  const fallbackTitle = fallback?.fallbackTitle || 'Webhosting NZ';
  const fallbackDescription = fallback?.fallbackDescription || '';

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('seo_settings')
      .select('meta_title, meta_description')
      .eq('page_slug', slug)
      .maybeSingle();

    if (error || !data) {
      return { title: fallbackTitle, description: fallbackDescription };
    }

    return {
      title: data.meta_title || fallbackTitle,
      description: data.meta_description || fallbackDescription,
    };
  } catch (err) {
    console.error(`Failed to fetch SEO override for "${slug}":`, err);
    return { title: fallbackTitle, description: fallbackDescription };
  }
}
