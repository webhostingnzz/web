import type { HostingInfo } from './types';

const AUCKLAND = { lat: -36.8485, lon: 174.7633 };

// Approximate hosting hub per country, used when the geo lookup only gives a
// country (ipinfo Lite). Good enough for "about 8,000 km from Auckland".
const COUNTRY_HUBS: Record<string, [number, number]> = {
  NZ: [-36.85, 174.76], AU: [-33.87, 151.21], SG: [1.35, 103.82], US: [37.4, -96.0],
  CA: [43.65, -79.38], GB: [51.51, -0.13], IE: [53.35, -6.26], DE: [50.11, 8.68],
  NL: [52.37, 4.9], FR: [48.86, 2.35], FI: [60.17, 24.94], SE: [59.33, 18.07],
  NO: [59.91, 10.75], DK: [55.68, 12.57], CH: [47.38, 8.54], AT: [48.21, 16.37],
  BE: [50.85, 4.35], ES: [40.42, -3.7], IT: [45.46, 9.19], PL: [52.23, 21.01],
  CZ: [50.08, 14.44], LT: [54.69, 25.28], JP: [35.68, 139.69], HK: [22.32, 114.17],
  KR: [37.57, 126.98], TW: [25.03, 121.57], IN: [19.08, 72.88], ID: [-6.21, 106.85],
  MY: [3.14, 101.69], PH: [14.6, 120.98], TH: [13.76, 100.5], VN: [10.82, 106.63],
  CN: [31.23, 121.47], BR: [-23.55, -46.63], ZA: [-26.2, 28.05], AE: [25.2, 55.27],
  IL: [32.09, 34.78], TR: [41.01, 28.98], RU: [55.76, 37.62], UA: [50.45, 30.52],
  MX: [19.43, -99.13], AR: [-34.6, -58.38], CL: [-33.45, -70.67], FJ: [-18.14, 178.44],
};

const COUNTRY_NAMES: Record<string, string> = {
  NZ: 'New Zealand', AU: 'Australia', SG: 'Singapore', US: 'United States', GB: 'United Kingdom',
};

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(lat2 - lat1);
  const dLon = r(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// Light in fibre covers ~200 km per ms; real routes are ~1.4x longer than a
// straight line, and a round trip goes both ways.
export function estimateRttMs(km: number): number {
  return Math.round((km * 2 * 1.4) / 200 + 2);
}

type Geo = { country: string | null; countryCode: string | null; city: string | null; provider: string | null; asn: string | null; lat: number | null; lon: number | null };

async function geoLookup(ip: string): Promise<Geo | null> {
  const token = process.env.IPINFO_TOKEN?.trim();
  try {
    if (token) {
      const res = await fetch(`https://api.ipinfo.io/lite/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`, { signal: AbortSignal.timeout(6000), cache: 'no-store' });
      if (res.ok) {
        const j: any = await res.json();
        const cc = j.country_code || null;
        const hub = cc ? COUNTRY_HUBS[cc] : undefined;
        return { country: j.country || null, countryCode: cc, city: null, provider: j.as_name || null, asn: j.asn || null, lat: hub?.[0] ?? null, lon: hub?.[1] ?? null };
      }
    }
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { signal: AbortSignal.timeout(6000), cache: 'no-store' });
    const j: any = await res.json();
    if (!j?.success) return null;
    return {
      country: j.country || null,
      countryCode: j.country_code || null,
      city: j.city || null,
      provider: j.connection?.org || j.connection?.isp || null,
      asn: j.connection?.asn ? `AS${j.connection.asn}` : null,
      lat: typeof j.latitude === 'number' ? j.latitude : null,
      lon: typeof j.longitude === 'number' ? j.longitude : null,
    };
  } catch (e) {
    console.error('Speed test geo lookup failed:', (e as Error).message);
    return null;
  }
}

// Spots CDNs and hosted platforms from response headers or the network owner.
// For these the IP is an edge server near the tester, not where the site lives.
function detectCdn(headers: Headers | null, provider: string | null): string | null {
  const h = (k: string) => headers?.get(k) || '';
  const server = h('server').toLowerCase();
  const p = (provider || '').toLowerCase();
  if (h('x-shopid') || h('x-shopify-stage') || /shopify/.test(server)) return 'Shopify';
  if (h('x-wix-request-id') || /wix/.test(p)) return 'Wix';
  if (/squarespace/.test(server) || /squarespace/.test(p)) return 'Squarespace';
  if (h('x-vercel-id')) return 'Vercel';
  if (h('x-nf-request-id') || /netlify/.test(server)) return 'Netlify';
  if (h('cf-ray') || /cloudflare/.test(server) || /cloudflare/.test(p)) return 'Cloudflare';
  if (h('x-amz-cf-id') || /cloudfront/.test(h('via').toLowerCase())) return 'Amazon CloudFront';
  if (/fastly/.test(p) || h('x-fastly-request-id')) return 'Fastly';
  if (/akamai/.test(p) || h('x-akamai-transformed')) return 'Akamai';
  if (/bunnycdn/.test(server) || h('cdn-pullzone')) return 'Bunny CDN';
  if (h('x-sucuri-id')) return 'Sucuri';
  if (/automattic/.test(p)) return 'WordPress.com';
  if (/^gws$|^google frontend$/.test(server) && /google/.test(p)) return 'Google';
  return null;
}

async function fetchHeaders(url: string): Promise<Headers | null> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; WebhostingNZ-SpeedTest/1.0; +https://webhosting.co.nz/website-speed-tester/)' },
    });
    res.body?.cancel().catch(() => {});
    return res.headers;
  } catch {
    return null;
  }
}

export async function lookupHosting(url: string, ip: string): Promise<HostingInfo> {
  const [geo, headers] = await Promise.all([geoLookup(ip), fetchHeaders(url)]);
  const cdn = detectCdn(headers, geo?.provider || null);
  const km = geo?.lat != null && geo?.lon != null ? Math.round(distanceKm(AUCKLAND.lat, AUCKLAND.lon, geo.lat, geo.lon)) : null;
  return {
    ip,
    country: geo?.country || (geo?.countryCode ? COUNTRY_NAMES[geo.countryCode] || geo.countryCode : null),
    countryCode: geo?.countryCode || null,
    city: geo?.city || null,
    provider: geo?.provider || null,
    asn: geo?.asn || null,
    lat: geo?.lat ?? null,
    lon: geo?.lon ?? null,
    distanceKm: km,
    estRttMs: km === null ? null : estimateRttMs(km),
    cdn,
  };
}
