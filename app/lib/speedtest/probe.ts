import type { NzProbeResult } from './types';

// Hook for a future timing probe running on a server in New Zealand.
//
// webhosting.co.nz itself runs in Singapore, so timings measured from here
// would not reflect what NZ visitors see. When an NZ server is available,
// deploy a small endpoint there that accepts
//   POST { url }  with header  Authorization: Bearer <NZ_PROBE_SECRET>
// measures DNS / connect / TLS / first byte / total for that URL, and returns
// JSON in the NzProbeResult shape. Then set NZ_PROBE_URL and NZ_PROBE_SECRET
// in the app's environment variables; results start appearing automatically.
export async function runNzProbe(url: string): Promise<NzProbeResult | null> {
  const endpoint = process.env.NZ_PROBE_URL?.trim();
  const secret = process.env.NZ_PROBE_SECRET?.trim();
  if (!endpoint || !secret) return null;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${secret}` },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(20_000),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const j: any = await res.json();
    const n = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? Math.round(v) : null);
    return {
      location: String(j.location || 'Auckland, NZ'),
      dnsMs: n(j.dnsMs),
      connectMs: n(j.connectMs),
      tlsMs: n(j.tlsMs),
      ttfbMs: n(j.ttfbMs),
      totalMs: n(j.totalMs),
    };
  } catch (e) {
    console.error('NZ probe failed:', (e as Error).message);
    return null;
  }
}
