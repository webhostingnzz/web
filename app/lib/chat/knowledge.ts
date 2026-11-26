import fs from 'fs';
import path from 'path';
import { getPricingPageData } from '../getPricingPlans';
import { getCustomPricing } from '../getCustomPricing';

// Everything the AI agent knows about the website is built here from the
// site's own content, so it stays in sync with the pages automatically.

const DATA_DIR = path.join(process.cwd(), 'app', 'data');

const PAGES: { file: string; url: string; title: string }[] = [
  { file: 'home_html.json', url: '/', title: 'Home' },
  { file: 'about_html.json', url: '/about/', title: 'About Webhosting NZ' },
  { file: 'contact_html.json', url: '/contact/', title: 'Contact' },
  { file: 'web_hosting_html.json', url: '/web-hosting/', title: 'Web Hosting' },
  { file: 'wordpress_hosting_html.json', url: '/wordpress-hosting/', title: 'WordPress Hosting' },
  { file: 'website_builder_hosting_html.json', url: '/website-builder-hosting/', title: 'Website Builder Hosting' },
  { file: 'vps_hosting_html.json', url: '/vps-hosting/', title: 'VPS Hosting' },
  { file: 'cloud_servers_html.json', url: '/cloud-servers/', title: 'Cloud Servers' },
  { file: 'domain_html.json', url: '/domain/', title: 'Domain Names' },
  { file: 'business_email_hosting_html.json', url: '/business-email-hosting/', title: 'Business Email Hosting' },
  { file: 'web_design_service_html.json', url: '/web-design-service/', title: 'Web Design Service' },
  { file: 'terms_and_conditions_html.json', url: '/terms-and-conditions/', title: 'Terms and Conditions' },
  { file: 'privacy_policy_html.json', url: '/privacy-policy/', title: 'Privacy Policy' },
  {
    file: 'free_google_review_qr_code_generator_html.json',
    url: '/free-google-review-qr-code-generator/',
    title: 'Free Google Review QR Code Generator',
  },
];

export type Chunk = { url: string; title: string; text: string };

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rarr;/g, '→')
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8211;|&ndash;/g, '-')
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function htmlToLines(html: string): string[] {
  const noJunk = html
    .replace(/<(script|style|noscript|svg|header|footer|nav)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const withBreaks = noJunk.replace(/<\/(p|div|li|h[1-6]|section|tr|br)>|<br\s*\/?>/gi, '\n');
  return decodeEntities(withBreaks.replace(/<[^>]+>/g, ' '))
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 1);
}

let cache: { chunks: Chunk[]; blogIndex: string; at: number } | null = null;

function build(): { chunks: Chunk[]; blogIndex: string } {
  const chunks: Chunk[] = [];
  const seen = new Set<string>(); // drops the nav/footer that repeats on every page

  for (const page of PAGES) {
    let html = '';
    try {
      html = JSON.parse(fs.readFileSync(path.join(DATA_DIR, page.file), 'utf8'));
    } catch {
      continue;
    }
    const lines = htmlToLines(String(html)).filter((l) => {
      if (seen.has(l) && l.length < 160) return false;
      seen.add(l);
      return true;
    });
    // ~1200 character passages so search returns focused answers
    let buf = '';
    for (const line of lines) {
      if (buf.length + line.length > 1200) {
        chunks.push({ url: page.url, title: page.title, text: buf.trim() });
        buf = '';
      }
      buf += line + '\n';
    }
    if (buf.trim()) chunks.push({ url: page.url, title: page.title, text: buf.trim() });
  }

  // Blog posts: short index for the prompt, full text searchable.
  let blogIndex = '';
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'blog_posts.json'), 'utf8'));
    for (const p of posts) {
      const url = `/blog/${p.slug}/`;
      blogIndex += `- ${p.title} (${url})\n`;
      const lines = htmlToLines(String(p.content_html || ''));
      let buf = '';
      for (const line of lines) {
        if (buf.length + line.length > 1200) {
          chunks.push({ url, title: `Blog: ${p.title}`, text: buf.trim() });
          buf = '';
        }
        buf += line + '\n';
      }
      if (buf.trim()) chunks.push({ url, title: `Blog: ${p.title}`, text: buf.trim() });
    }
  } catch {
    /* blog optional */
  }

  return { chunks, blogIndex };
}

function getBuilt() {
  if (!cache) cache = { ...build(), at: Date.now() };
  return cache;
}

const STOP = new Set(
  'the a an and or of to for in on is are do does can i you my your with what how much it this that be at as by from have has will we our about me'.split(' ')
);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

// Lightweight keyword search over every page and blog post.
export function searchSite(query: string, limit = 5): Chunk[] {
  const q = tokens(query);
  if (!q.length) return [];
  const { chunks } = getBuilt();
  const scored = chunks
    .map((c) => {
      const hay = (c.title + ' ' + c.text).toLowerCase();
      let score = 0;
      for (const t of q) {
        const hits = hay.split(t).length - 1;
        if (hits) score += 1 + Math.min(hits, 4) * 0.5;
      }
      if (c.title.toLowerCase().includes(q.join(' '))) score += 3;
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((x) => x.c);
}

// Live prices (Supabase, admin-editable) with the hardcoded fallbacks.
export async function getLivePricingText(): Promise<string> {
  const out: string[] = [];
  for (const page of ['web_hosting', 'wordpress_hosting', 'website_builder_hosting']) {
    try {
      const d = await getPricingPageData(page);
      out.push(`## ${d.heading} (page: ${page.replace(/_/g, '-')})`);
      for (const p of d.plans) {
        out.push(
          `- ${p.name}: ${p.currency}${p.monthlyPrice}/month (billed annually ${p.currency}${p.annualPrice}). ${p.features.join(', ')}. Order: ${p.orderUrl}`
        );
      }
    } catch {
      /* skip */
    }
  }
  const cats: [string, string][] = [
    ['vps', 'VPS hosting'],
    ['cloud_servers_webhosting_nz', 'Cloud servers (Webhosting NZ)'],
    ['cloud_servers_aws', 'Cloud servers (AWS)'],
    ['cloud_servers_gcp', 'Cloud servers (Google Cloud)'],
    ['web_design', 'Web design packages'],
    ['domain_tld', 'Domain extensions (price per year)'],
  ];
  for (const [cat, label] of cats) {
    const items = await getCustomPricing(cat);
    if (!items.length) continue;
    out.push(`## ${label}`);
    for (const i of items) {
      const specs = Object.entries(i.specs || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      out.push(`- ${i.item_name}: NZ$${i.price}${specs ? ` (${specs})` : ''}${i.order_link ? ` Order: ${i.order_link}` : ''}`);
    }
  }
  return out.join('\n');
}

export function getBlogIndex(): string {
  return getBuilt().blogIndex;
}

export function getSiteMap(): string {
  return PAGES.map((p) => `- ${p.title}: ${p.url}`).join('\n');
}
