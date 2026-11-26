import geoip from 'geoip-country';

// Works out where a visitor is (country) and what they are using (browser / OS / device),
// from the request headers. The country comes from an offline IP database bundled with the
// site - the visitor's IP address is never sent to a third-party service.

const PRIVATE = /^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|::1$|fc|fd|fe80)/i;

function clean(ip: string | null | undefined): string | null {
  if (!ip) return null;
  let v = ip.trim();
  if (!v) return null;
  if (v.startsWith('::ffff:')) v = v.slice(7);
  // "1.2.3.4:5678" -> "1.2.3.4" (IPv6 addresses contain several colons, so leave those alone)
  if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(v)) v = v.split(':')[0];
  v = v.replace(/^\[|\]$/g, '');
  return PRIVATE.test(v) ? null : v;
}

export function getClientIp(h: Headers): string | null {
  const direct = clean(h.get('cf-connecting-ip')) || clean(h.get('x-real-ip')) || clean(h.get('x-client-ip'));
  if (direct) return direct;
  const xff = h.get('x-forwarded-for');
  if (xff) {
    for (const part of xff.split(',')) {
      const ip = clean(part);
      if (ip) return ip;
    }
  }
  const fwd = h.get('forwarded')?.match(/for="?\[?([^;,"\]]+)/i);
  return clean(fwd?.[1]);
}

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' });
  } catch {
    return null;
  }
})();

export function countryName(code: string | null | undefined): string | null {
  if (!code || !/^[A-Za-z]{2}$/.test(code)) return null;
  try {
    return regionNames?.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

export function parseBrowser(ua: string): { browser: string; os: string; device: 'mobile' | 'tablet' | 'desktop' } {
  const v = (re: RegExp) => ua.match(re)?.[1]?.split('.')[0];

  let browser = 'Unknown browser';
  if (/Edg(e|A|iOS)?\//.test(ua)) browser = `Edge ${v(/Edg(?:e|A|iOS)?\/([\d.]+)/) || ''}`;
  else if (/OPR\/|Opera/.test(ua)) browser = `Opera ${v(/OPR\/([\d.]+)/) || ''}`;
  else if (/SamsungBrowser\//.test(ua)) browser = `Samsung Internet ${v(/SamsungBrowser\/([\d.]+)/) || ''}`;
  else if (/FxiOS\/|Firefox\//.test(ua)) browser = `Firefox ${v(/(?:FxiOS|Firefox)\/([\d.]+)/) || ''}`;
  else if (/CriOS\/|Chrome\//.test(ua)) browser = `Chrome ${v(/(?:CriOS|Chrome)\/([\d.]+)/) || ''}`;
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = `Safari ${v(/Version\/([\d.]+)/) || ''}`;

  let os = 'Unknown OS';
  if (/Windows NT/.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Mac OS X|Macintosh/.test(ua)) os = 'macOS';
  else if (/CrOS/.test(ua)) os = 'ChromeOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  const device = /iPad|Tablet|(Android(?!.*Mobile))/.test(ua) ? 'tablet' : /Mobi|iPhone|Android/.test(ua) ? 'mobile' : 'desktop';
  return { browser: browser.trim(), os, device };
}

export type VisitorInfo = {
  country: string | null; // "New Zealand"
  location: string; // "New Zealand" or "Unknown location"
  browserLine: string; // "Chrome 142 · Windows · desktop"
};

export function describeVisitor(h: Headers, ua: string): VisitorInfo {
  // Prefer a CDN-provided country if one is present, otherwise look the IP up offline.
  let country = countryName(h.get('cf-ipcountry') || h.get('x-vercel-ip-country'));
  if (!country) {
    const ip = getClientIp(h);
    if (ip) {
      try {
        country = geoip.lookup(ip)?.name || null;
      } catch {
        country = null;
      }
    }
  }
  const b = parseBrowser(ua);
  return {
    country,
    location: country || 'Unknown location',
    browserLine: `${b.browser} · ${b.os} · ${b.device}`,
  };
}
