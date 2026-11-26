import { NextRequest, NextResponse } from 'next/server';
import { tgSendGetId, tgEdit } from '../../../lib/chat/telegram';
import { describeVisitor, getClientIp } from '../../../lib/chat/visitorInfo';

export const runtime = 'nodejs';

// "Live visitor" alert. The widget calls this when a visitor arrives and again each time they
// open another page; the SAME Telegram message is edited so you see where they are right now.
// Set LIVE_VISITOR_ALERTS=off to switch these alerts off (chat alerts are unaffected).
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|preview|curl|wget|python|go-http|axios/i;

const newHits = new Map<string, number[]>();
const editHits = new Map<string, number[]>();
function limited(map: Map<string, number[]>, ip: string, max: number) {
  const now = Date.now();
  const recent = (map.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  map.set(ip, recent);
  if (map.size > 5000) map.clear();
  return recent.length > max;
}

const cleanPath = (v: unknown) => String(v || '').slice(0, 80);

export async function POST(req: NextRequest) {
  if (process.env.LIVE_VISITOR_ALERTS?.trim().toLowerCase() === 'off') return NextResponse.json({ ok: true });

  const ua = req.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return NextResponse.json({ ok: true });

  const body = await req.json().catch(() => null);
  const page = cleanPath(body?.page) || '/';
  if (page.startsWith('/admin')) return NextResponse.json({ ok: true });

  const mid = Number.isInteger(body?.mid) && body.mid > 0 ? (body.mid as number) : null;
  const ip = getClientIp(req.headers) || 'unknown';
  if (mid ? limited(editHits, ip, 40) : limited(newHits, ip, 5)) return NextResponse.json({ ok: true });

  const trail: string[] = Array.isArray(body?.trail) ? body.trail.slice(-6).map(cleanPath).filter(Boolean) : [page];

  let from = 'direct';
  try {
    const r = String(body?.referrer || '');
    if (r) {
      const host = new URL(r).hostname;
      if (!host.endsWith('webhosting.co.nz')) from = host;
    }
  } catch {
    /* ignore */
  }

  const info = describeVisitor(req.headers, ua);
  const time = new Intl.DateTimeFormat('en-NZ', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Pacific/Auckland' }).format(new Date());

  const text = [
    '👀 Live visitor',
    `Now on: ${page}`,
    trail.length > 1 ? `Pages: ${trail.join(' → ')}` : null,
    `From: ${from}`,
    `Location: ${info.location}`,
    `Browser: ${info.browserLine}`,
    `Last active: ${time} NZ time`,
  ]
    .filter(Boolean)
    .join('\n');

  if (mid) {
    await tgEdit(mid, text);
    return NextResponse.json({ ok: true, mid });
  }
  const newId = await tgSendGetId(text);
  return NextResponse.json({ ok: true, mid: newId });
}
