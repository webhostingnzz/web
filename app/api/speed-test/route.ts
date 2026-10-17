import { NextRequest, NextResponse, after } from 'next/server';
import { normaliseUrl, resolvePublic } from '../../lib/speedtest/url';
import { checkLimits, createTest, findRecent, hashIp, newId, runTest } from '../../lib/speedtest/store';

export const dynamic = 'force-dynamic';
// The test keeps running after the response is sent (see after() below).
export const maxDuration = 300;

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

// Starts a speed test. Returns { id } straight away; the page then polls
// GET /api/speed-test/<id> until the result is ready.
export async function POST(request: NextRequest) {
  try {
    if (!process.env.PAGESPEED_API_KEY?.trim()) {
      console.error('Speed test: PAGESPEED_API_KEY is not set');
      return NextResponse.json({ error: 'The speed test is not set up yet. Please try again later.' }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = normaliseUrl(body?.url);
    if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const resolved = await resolvePublic(parsed.host);
    if ('error' in resolved) return NextResponse.json({ error: resolved.error }, { status: 400 });

    // Same page tested a few minutes ago: share that result, no quota used.
    const recent = await findRecent(parsed.url);
    if (recent) return NextResponse.json({ id: recent, reused: true });

    const ipHash = hashIp(clientIp(request));
    const limited = await checkLimits(ipHash);
    if (limited) return NextResponse.json({ error: limited }, { status: 429 });

    const id = newId();
    await createTest(id, parsed.url, parsed.host, ipHash);
    after(() => runTest(id, parsed.url, resolved.ip));
    return NextResponse.json({ id });
  } catch (e) {
    console.error('Speed test start error:', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
