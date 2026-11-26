import { NextRequest, NextResponse } from 'next/server';
import { tgSend } from '../../../lib/chat/telegram';

export const runtime = 'nodejs';

// "Live visitor" alert: the widget calls this once per browser session.
// Set LIVE_VISITOR_ALERTS=off to switch these pings off (chat alerts are unaffected).
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|preview|curl|wget|python|go-http|axios/i;

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function POST(req: NextRequest) {
  if (process.env.LIVE_VISITOR_ALERTS?.trim().toLowerCase() === 'off') return NextResponse.json({ ok: true });

  const ua = req.headers.get('user-agent') || '';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!ua || BOT.test(ua) || limited(ip)) return NextResponse.json({ ok: true });

  const body = await req.json().catch(() => null);
  const page = String(body?.page || '/').slice(0, 150);
  if (page.startsWith('/admin')) return NextResponse.json({ ok: true });

  let ref = 'direct';
  try {
    const r = String(body?.referrer || '');
    if (r) {
      const host = new URL(r).hostname;
      if (!host.endsWith('webhosting.co.nz')) ref = host;
    }
  } catch {
    /* ignore */
  }

  const country = req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry') || 'unknown';
  const device = /mobile|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop';

  await tgSend(`👀 Live visitor\nPage: ${page}\nFrom: ${ref}\nCountry: ${country} · ${device}`);
  return NextResponse.json({ ok: true });
}
