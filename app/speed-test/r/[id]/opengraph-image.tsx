import { ImageResponse } from 'next/og';
import { getPublicResult } from '../../../lib/speedtest/store';
import { GRADE_COLORS } from '../../../lib/speedtest/grade';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'NZ Website Speed Test result';

// Social preview card for a shared result.
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getPublicResult(id).catch(() => null);
  const done = r?.status === 'done';
  const grade = done ? r!.grade || '?' : '?';
  const color = GRADE_COLORS[grade] || '#0CC0DF';
  const where = done && r!.hosting && !r!.hosting.cdn && r!.hosting.country ? `Hosted in ${r!.hosting.country}` : '';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a0f1e', color: '#fff', padding: 64, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 30, color: '#0CC0DF', fontWeight: 700 }}>NZ Website Speed Test</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div style={{ width: 230, height: 230, borderRadius: 40, background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 28, opacity: 0.9, display: 'flex' }}>GRADE</div>
            <div style={{ fontSize: 140, fontWeight: 800, lineHeight: 1, display: 'flex' }}>{grade}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
            <div style={{ fontSize: 58, fontWeight: 800, display: 'flex' }}>{r?.host || 'Website speed test'}</div>
            {done && (
              <div style={{ fontSize: 34, color: '#cbd5e1', display: 'flex' }}>
                {`Mobile ${r!.mobile?.score}/100 · Desktop ${r!.desktop?.score}/100`}
              </div>
            )}
            {where && <div style={{ fontSize: 30, color: '#94a3b8', display: 'flex' }}>{where}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>Test your site free at webhosting.co.nz/speed-test</div>
      </div>
    ),
    size,
  );
}
