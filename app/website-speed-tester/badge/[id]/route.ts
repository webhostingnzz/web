import { getSupabaseAdmin } from '../../../lib/supabase';
import { GRADE_COLORS } from '../../../lib/speedtest/grade';

export const dynamic = 'force-dynamic';

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function badgeSvg(grade: string | null, host: string | null) {
  const color = (grade && GRADE_COLORS[grade]) || '#0CC0DF';
  const label = grade ? `Grade ${grade} on the NZ Website Speed Test` : 'NZ Website Speed Test';
  const title = host ? `${host}: ${label}` : label;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="44" viewBox="0 0 240 44" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<clipPath id="r"><rect width="240" height="44" rx="8"/></clipPath>
<g clip-path="url(#r)">
<rect width="240" height="44" fill="#0a0f1e"/>
<rect x="168" width="72" height="44" fill="${color}"/>
</g>
<g font-family="Outfit,Verdana,DejaVu Sans,Arial,sans-serif">
<circle cx="18" cy="22" r="8" fill="none" stroke="#0CC0DF" stroke-width="2.5"/>
<path d="M18 22 L23 17" stroke="#0CC0DF" stroke-width="2.5" stroke-linecap="round"/>
<text x="34" y="20" fill="#ffffff" font-size="12.5" font-weight="700">NZ Speed Test</text>
<text x="34" y="34" fill="#0CC0DF" font-size="10">by webhosting.co.nz</text>
<text x="204" y="17" fill="#ffffff" font-size="9.5" text-anchor="middle" opacity="0.9">GRADE</text>
<text x="204" y="37" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">${grade ? esc(grade) : '?'}</text>
</g>
</svg>`;
}

// /website-speed-tester/badge/<id>.svg — the embeddable badge for a result.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: raw } = await params;
  const id = raw.replace(/\.svg$/i, '');
  let grade: string | null = null;
  let host: string | null = null;
  if (/^[A-Za-z0-9]{6,20}$/.test(id)) {
    try {
      const { data } = await getSupabaseAdmin().from('speed_tests').select('grade, host, status').eq('id', id).maybeSingle();
      if (data?.status === 'done') {
        grade = data.grade;
        host = data.host;
      }
    } catch (e) {
      console.error('Badge lookup failed:', e);
    }
  }
  return new Response(badgeSvg(grade, host), {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': grade ? 'public, max-age=86400' : 'public, max-age=300',
      'access-control-allow-origin': '*',
    },
  });
}
