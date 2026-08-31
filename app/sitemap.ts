import type { MetadataRoute } from 'next';
import { getAllPosts } from './lib/blogApi';

const BASE_URL = 'https://webhosting.co.nz';

// Every static page on the site. changeFrequency/priority are hints to
// Google, not guarantees — priority is relative to other pages on this
// site only (1.0 = most important), and doesn't affect ranking directly.
const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/web-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/wordpress-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/website-builder-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/vps-hosting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/cloud-servers', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/domain', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/business-email-hosting', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/web-design-service', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/free-google-review-qr-code-generator', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts are fetched live — if WordPress is briefly unreachable when
  // this runs, we still return the static pages rather than failing the
  // whole sitemap.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogEntries = posts.map((post) => ({
      url: `${BASE_URL}/${post.slug}`,
      lastModified: post.modified || post.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (err) {
    console.error('Sitemap: failed to fetch blog posts, continuing with static pages only:', err);
  }

  return [...staticEntries, ...blogEntries];
}
