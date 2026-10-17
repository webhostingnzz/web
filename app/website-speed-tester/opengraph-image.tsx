import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Free NZ Website Speed Tester by Webhosting NZ';

// Social preview card for the tool page.
export default function Image() {
  const grades: [string, string][] = [['A', '#16a34a'], ['B', '#65a30d'], ['C', '#ca8a04'], ['D', '#ea580c'], ['F', '#dc2626']];
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: 'linear-gradient(135deg, #0a0f1e 0%, #0b2235 100%)', color: '#fff', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 30, color: '#0CC0DF', fontWeight: 700 }}>Webhosting NZ · Free tool</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>NZ Website</div>
            <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: '#0CC0DF' }}>Speed Tester</div>
            <div style={{ display: 'flex', fontSize: 32, color: '#cbd5e1', marginTop: 8 }}>PageSpeed score · Core Web Vitals · Hosting location</div>
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>webhosting.co.nz/website-speed-tester</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          {grades.map(([g, c]) => (
            <div key={g} style={{ width: 84, height: 84, borderRadius: 20, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, fontWeight: 800 }}>{g}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
