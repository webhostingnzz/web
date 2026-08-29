// Fetches blog posts live from the WordPress backend running on the
// blog.webhosting.co.nz subdomain. Next.js caches this fetch and
// automatically re-checks it every REVALIDATE_SECONDS, so new posts and
// edits made in WordPress show up on the live site without a redeploy.

const WP_API_BASE = 'https://blog.webhosting.co.nz/wp-json/wp/v2';
export const REVALIDATE_SECONDS = 3600; // re-check WordPress once an hour

const SITENAME = 'Webhosting NZ';
const SEP = '-';

export type TocItem = { id: string; text: string; level: string };

export type BlogPost = {
  slug: string;
  title: string;
  seo_title: string;
  seo_description: string;
  date: string;
  modified: string;
  content_html: string;
  excerpt_html: string;
  featured_image: { url: string; alt: string; width?: number; height?: number } | null;
  categories: string[];
  tags: string[];
  toc: TocItem[];
};

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&#0?38;/g, '&')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html: string): string {
  return html.replace(/<[^<]+?>/g, '');
}

function cleanTitle(raw: string): string {
  return decodeEntities(stripTags(raw)).trim();
}

function resolveVars(text: string, postTitle: string): string {
  const currentYear = String(new Date().getFullYear());
  let out = decodeEntities(text);
  out = out.replace(/%currentyear%/g, currentYear);
  out = out.replace(/%title%/g, postTitle);
  out = out.replace(/\s+/g, ' ').trim();
  return out;
}

function slugify(text: string): string {
  let s = decodeEntities(stripTags(text)).toLowerCase();
  s = s.replace(/[^a-z0-9\s-]/g, '');
  s = s.replace(/\s+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'section';
}

function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const usedIds: Record<string, number> = {};
  const newHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
    (_match, attrs, inner) => {
      const base = slugify(inner);
      usedIds[base] = (usedIds[base] || 0) + 1;
      const id = usedIds[base] === 1 ? base : `${base}-${usedIds[base]}`;
      toc.push({ id, text: decodeEntities(stripTags(inner)).trim(), level: 'h2' });
      return `<h2${attrs} id="${id}">${inner}</h2>`;
    }
  );
  return { html: newHtml, toc };
}

function transformPost(raw: any): BlogPost {
  const postTitle = cleanTitle(raw.title?.rendered || '');

  const rmTitle: string = raw.meta?.rank_math_title || '';
  const rmDesc: string = raw.meta?.rank_math_description || '';

  const seoTitle = rmTitle.trim()
    ? resolveVars(rmTitle, postTitle)
    : `${postTitle} ${SEP} ${SITENAME}`;
  const seoDescription = rmDesc.trim() ? resolveVars(rmDesc, postTitle) : '';

  let featured: BlogPost['featured_image'] = null;
  const fm = raw._embedded?.['wp:featuredmedia']?.[0];
  if (fm) {
    featured = {
      url: fm.source_url,
      alt: decodeEntities(fm.alt_text || postTitle),
      width: fm.media_details?.width,
      height: fm.media_details?.height,
    };
  }

  const categories: string[] = [];
  const tags: string[] = [];
  const termGroups = raw._embedded?.['wp:term'] || [];
  for (const group of termGroups) {
    for (const term of group) {
      const name = decodeEntities(term.name || '');
      if (term.taxonomy === 'category') categories.push(name);
      else if (term.taxonomy === 'post_tag') tags.push(name);
    }
  }

  const { html: contentWithIds, toc } = addHeadingIds(raw.content?.rendered || '');

  return {
    slug: raw.slug,
    title: postTitle,
    seo_title: seoTitle,
    seo_description: seoDescription,
    date: raw.date,
    modified: raw.modified,
    content_html: contentWithIds,
    excerpt_html: raw.excerpt?.rendered || '',
    featured_image: featured,
    categories,
    tags,
    toc,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_API_BASE}/posts?per_page=100&_embed`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const raw = await res.json();
    return raw.map(transformPost);
  } catch (e) {
    console.error('Failed to fetch blog posts from WordPress:', e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const raw = await res.json();
    if (!raw.length) return null;
    return transformPost(raw[0]);
  } catch (e) {
    console.error(`Failed to fetch blog post "${slug}" from WordPress:`, e);
    return null;
  }
}
