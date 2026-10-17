import type { FieldData, Fix, StrategyResult } from './types';

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Lighthouse audit ids (classic audits and the newer "insights") mapped to a
// plain-English fix. Several ids share a key so we never show the same advice twice.
const PLAIN_FIXES: Record<string, { key: string; title: string; tip: string }> = {};

function add(ids: string[], key: string, title: string, tip: string) {
  for (const id of ids) PLAIN_FIXES[id] = { key, title, tip };
}

add(['server-response-time', 'document-latency-insight'], 'server',
  'Your server is slow to respond',
  'The browser waits too long for the first byte of the page. Faster hosting, page caching, and a server close to your visitors (for NZ visitors, a server in New Zealand) all cut this wait.');
add(['render-blocking-resources', 'render-blocking-insight'], 'render-blocking',
  'Files are blocking the page from showing',
  'Some CSS and JavaScript files must download before anything appears. Load non-essential scripts with "defer" or "async" and inline the small amount of CSS needed for the top of the page.');
add(['uses-optimized-images', 'modern-image-formats', 'uses-responsive-images', 'efficient-animated-content', 'image-delivery-insight'], 'images',
  'Your images are too big',
  'Compress images, serve them as WebP or AVIF, and size them to how big they actually appear on screen. Swap animated GIFs for video.');
add(['offscreen-images'], 'lazy-images',
  'Images below the fold load too early',
  'Add loading="lazy" to images further down the page so the browser can focus on what visitors see first.');
add(['unused-javascript'], 'unused-js',
  'You are loading JavaScript you do not use',
  'Remove plugins and scripts you no longer need, and only load scripts on the pages that use them.');
add(['unused-css-rules'], 'unused-css',
  'You are loading CSS you do not use',
  'Remove unused stylesheets (themes and page builders often load a lot) or use a tool that strips unused CSS.');
add(['unminified-javascript', 'unminified-css'], 'minify',
  'CSS and JavaScript are not minified',
  'Minify your CSS and JavaScript files. Most caching or optimisation plugins can do this with one setting.');
add(['uses-text-compression'], 'compression',
  'Text files are not compressed',
  'Turn on gzip or Brotli compression on your server so HTML, CSS and JavaScript download much smaller.');
add(['uses-long-cache-ttl', 'cache-insight'], 'cache',
  'Browsers are not caching your files',
  'Set long cache times for images, CSS and JavaScript so returning visitors do not download them again.');
add(['total-byte-weight'], 'weight',
  'The page is very heavy',
  'The total download size is large. Trim big images, videos, fonts and scripts, especially on mobile.');
add(['font-display', 'font-display-insight'], 'fonts',
  'Text is hidden while fonts load',
  'Use font-display: swap so visitors can read text straight away while your web fonts load.');
add(['third-party-summary', 'third-parties-insight'], 'third-party',
  'Third-party scripts slow the page',
  'Chat widgets, trackers, embeds and ad scripts add up. Remove the ones you do not need and load the rest after the page.');
add(['dom-size', 'dom-size-insight'], 'dom',
  'The page structure is too complex',
  'The page has a very large number of elements, which slows rendering. Simplify layouts and avoid deeply nested page-builder sections.');
add(['bootup-time', 'mainthread-work-breakdown', 'long-tasks', 'forced-reflow-insight'], 'js-work',
  'Too much JavaScript runs on load',
  'The browser is busy running scripts, so the page feels slow to respond. Remove heavy scripts or delay them until after the page loads.');
add(['redirects', 'redirects-insight'], 'redirects',
  'The page goes through redirects',
  'Each redirect adds a round trip. Link directly to the final address (for example https://www. version).');
add(['largest-contentful-paint-element', 'lcp-discovery-insight', 'prioritize-lcp-image', 'lcp-lazy-loaded', 'lcp-phases-insight', 'lcp-breakdown-insight'], 'lcp',
  'The main content shows up late',
  'The biggest image or heading at the top of the page loads late. Do not lazy-load it, give it fetchpriority="high", and keep it small.');
add(['legacy-javascript', 'legacy-javascript-insight', 'duplicated-javascript', 'duplicated-javascript-insight'], 'legacy-js',
  'Old or duplicate JavaScript is loaded',
  'Some scripts are loaded twice or include code for very old browsers. Update plugins and your build tools.');
add(['layout-shifts', 'cls-culprits-insight', 'unsized-images', 'non-composited-animations'], 'cls',
  'The page jumps around while loading',
  'Give images, ads and embeds a fixed width and height so content does not shift as they load.');
add(['critical-request-chains', 'network-dependency-tree-insight', 'uses-rel-preconnect'], 'chains',
  'Important files load one after another',
  'Files that depend on each other load in a chain. Preconnect to key domains and preload critical fonts and images.');

type Audit = {
  id: string;
  title?: string;
  score: number | null;
  scoreDisplayMode?: string;
  numericValue?: number;
  metricSavings?: Record<string, number>;
  details?: { type?: string; overallSavingsMs?: number; items?: unknown[] };
};

function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

function stripMarkdown(s: string): string {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`/g, '');
}

function extractFixes(audits: Record<string, Audit>, perfRefs: { id: string; group?: string }[]): Fix[] {
  const candidates: { fix: Fix; rank: number }[] = [];
  for (const ref of perfRefs) {
    if (ref.group === 'metrics' || ref.group === 'hidden') continue;
    const a = audits[ref.id];
    if (!a || a.score === null || a.score === undefined || a.score >= 0.9) continue;
    if (a.scoreDisplayMode === 'informative' || a.scoreDisplayMode === 'notApplicable' || a.scoreDisplayMode === 'manual') continue;
    const plain = PLAIN_FIXES[a.id];
    // Only blame the server when it really is slow.
    if (plain?.key === 'server' && (num(audits['server-response-time']?.numericValue) ?? 0) < 600) continue;
    const s = a.metricSavings || {};
    // Savings overlap between metrics, so use the largest rather than a sum.
    const savingsMs = Math.max(s.LCP || 0, s.FCP || 0, s.TBT || 0, a.details?.overallSavingsMs || 0);
    const rank = savingsMs + (s.CLS || 0) * 10000 + (1 - a.score) * 100;
    candidates.push({
      fix: {
        key: plain?.key || a.id,
        title: plain?.title || stripMarkdown(a.title || a.id),
        tip: plain?.tip || '',
        savingsMs: savingsMs > 0 ? Math.round(savingsMs) : undefined,
      },
      rank,
    });
  }
  candidates.sort((x, y) => y.rank - x.rank);
  const seen = new Set<string>();
  const out: Fix[] = [];
  for (const c of candidates) {
    if (seen.has(c.fix.key)) continue;
    seen.add(c.fix.key);
    // Unknown audits without plain-English text go last-resort only.
    if (!c.fix.tip && out.length >= 3) continue;
    out.push(c.fix);
    if (out.length >= 6) break;
  }
  return out;
}

function extractField(json: any): FieldData | null {
  const pick = (exp: any, scope: 'page' | 'origin'): FieldData | null => {
    const m = exp?.metrics;
    if (!m || exp?.origin_fallback && scope === 'page') return null;
    const p = (k: string) => num(m?.[k]?.percentile);
    const cls = p('CUMULATIVE_LAYOUT_SHIFT_SCORE');
    const data: FieldData = {
      lcpMs: p('LARGEST_CONTENTFUL_PAINT_MS'),
      cls: cls === null ? null : cls / 100,
      inpMs: p('INTERACTION_TO_NEXT_PAINT'),
      ttfbMs: p('EXPERIMENTAL_TIME_TO_FIRST_BYTE'),
      category: exp?.overall_category || null,
      scope,
    };
    return data.lcpMs !== null || data.inpMs !== null ? data : null;
  };
  return pick(json.loadingExperience, 'page') || pick(json.originLoadingExperience, 'origin');
}

export class PageSpeedError extends Error {}

export async function runPageSpeed(url: string, strategy: 'mobile' | 'desktop', apiKey: string): Promise<{ result: StrategyResult; finalUrl: string | null }> {
  const params = new URLSearchParams({ url, strategy, category: 'performance', key: apiKey, locale: 'en' });
  let res: Response;
  try {
    res = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(110_000), cache: 'no-store' });
  } catch {
    throw new PageSpeedError('Google PageSpeed took too long to respond. Please try again.');
  }
  const json: any = await res.json().catch(() => null);
  if (!res.ok || !json?.lighthouseResult) {
    const msg: string = json?.error?.message || '';
    console.error(`PageSpeed ${strategy} failed (${res.status}):`, msg.slice(0, 300));
    if (/FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS_FAILURE|NO_FCP|unable to reliably load/i.test(msg)) {
      throw new PageSpeedError('Google could not load that page. Check the address is right and the site is online.');
    }
    if (res.status === 429) throw new PageSpeedError('The speed test is very busy right now. Please try again in a few minutes.');
    throw new PageSpeedError('Google PageSpeed could not test this page. Please try again.');
  }

  const lh = json.lighthouseResult;
  const audits: Record<string, Audit> = lh.audits || {};
  const perf = lh.categories?.performance;
  const v = (id: string) => num(audits[id]?.numericValue);
  const requestItems = (audits['network-requests']?.details?.items as unknown[] | undefined) || null;

  return {
    finalUrl: lh.finalDisplayedUrl || lh.finalUrl || null,
    result: {
      score: Math.round((num(perf?.score) || 0) * 100),
      lcpMs: v('largest-contentful-paint'),
      cls: v('cumulative-layout-shift'),
      tbtMs: v('total-blocking-time'),
      fcpMs: v('first-contentful-paint'),
      speedIndexMs: v('speed-index'),
      serverResponseMs: v('server-response-time'),
      pageBytes: v('total-byte-weight'),
      requests: requestItems ? requestItems.length : null,
      field: extractField(json),
      fixes: extractFixes(audits, perf?.auditRefs || []),
    },
  };
}
