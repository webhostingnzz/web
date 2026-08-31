// Structured data (JSON-LD) builders for SEO rich results.
//
// These don't change anything visible on the page — they add machine-
// readable data that search engines use to power rich results: star
// ratings, article previews with dates/images, breadcrumb trails instead
// of raw URLs, and pricing shown directly in search listings.
//
// Reference: https://schema.org and https://developers.google.com/search/docs/appearance/structured-data

const SITE_URL = 'https://webhosting.co.nz';
const SITE_NAME = 'Webhosting NZ';
const LOGO_URL = `${SITE_URL}/images/logo.webp`;

// --- Organization: who owns this site. Powers the knowledge panel logo,
// and is referenced by other schema types (Article "publisher" etc). ---
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: 'info@webhosting.co.nz',
    telephone: '+64225476114',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '243A Warwick Road, Mayfair',
      addressLocality: 'Hastings',
      postalCode: '4122',
      addressCountry: 'NZ',
    },
    sameAs: [
      'https://www.facebook.com/webhostingnewzealand',
      'https://x.com/webhostingnzx',
      'https://www.instagram.com/webhostingnz/',
    ],
  };
}

// --- WebSite: identifies the site itself as a distinct entity. ---
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

// --- BreadcrumbList: shown in search results instead of the raw URL,
// e.g. "Home > Web Hosting" instead of "webhosting.co.nz/web-hosting". ---
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// --- Article/BlogPosting: makes blog posts eligible for rich results
// with author, publish/modified dates, and a preview image. ---
export function getArticleSchema(post: {
  title: string;
  slug: string;
  date: string;
  modified: string;
  featured_image: { url: string } | null;
  seo_description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo_description,
    image: post.featured_image ? [post.featured_image.url] : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    url: `${SITE_URL}/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${post.slug}` },
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  };
}

// --- Product + Offer: lets Google show your actual prices directly in
// search results. One Product per plan, each with its own Offer. ---
export function getProductSchema(plans: { name: string; monthlyPrice: string; features?: string[] }[], pageUrl: string) {
  return plans.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${plan.name} — ${SITE_NAME}`,
    description: (plan.features || []).join(', ') || undefined,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${pageUrl}`,
      priceCurrency: 'NZD',
      price: plan.monthlyPrice,
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: 'https://schema.org/InStock',
    },
  }));
}
