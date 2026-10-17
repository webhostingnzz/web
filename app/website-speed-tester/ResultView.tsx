'use client';

import { useEffect, useId, useState } from 'react';
import s from './speedtest.module.css';
import { GRADE_COLORS, rate, type Rating } from '../lib/speedtest/grade';
import type { HostingInfo, PublicResult, StrategyResult } from '../lib/speedtest/types';

export const SITE = 'https://webhosting.co.nz';
export const TOOL_PATH = '/website-speed-tester';
const PLATFORMS = ['Shopify', 'Wix', 'Squarespace', 'WordPress.com', 'Vercel', 'Netlify'];

export function fmtMs(v: number | null | undefined): string {
  if (v === null || v === undefined) return '–';
  return v >= 1000 ? `${(v / 1000).toFixed(1)} s` : `${Math.round(v)} ms`;
}
function fmtBytes(v: number | null | undefined): string {
  if (v === null || v === undefined) return '–';
  return v >= 1024 * 1024 ? `${(v / 1024 / 1024).toFixed(1)} MB` : `${Math.round(v / 1024)} KB`;
}
const rClass = (r: Rating | null) => (r === 'good' ? s.rgood : r === 'ok' ? s.rok : r === 'poor' ? s.rpoor : s.rnone);
const ratingColor = (r: Rating | null) => (r === 'good' ? '#16a34a' : r === 'ok' ? '#d97706' : r === 'poor' ? '#dc2626' : '#94a3b8');

export function MobileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" />
    </svg>
  );
}
export function DesktopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  );
}

// Polls the API while a test is running.
export function usePollResult(id: string | null, initial: PublicResult | null = null) {
  const [result, setResult] = useState<PublicResult | null>(initial);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    if (initial && initial.id === id && initial.status !== 'running') return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const started = Date.now();
    const tick = async () => {
      try {
        const res = await fetch(`/api/speed-test/${id}/`, { cache: 'no-store' });
        const json = await res.json();
        if (stop) return;
        if (!res.ok) { setError(json.error || 'Something went wrong.'); return; }
        setResult(json);
        if (json.status === 'running' && Date.now() - started < 5 * 60 * 1000) timer = setTimeout(tick, 2500);
      } catch {
        if (!stop) timer = setTimeout(tick, 4000);
      }
    };
    tick();
    return () => { stop = true; clearTimeout(timer); };
  }, [id, initial]);
  return { result, error };
}

function Ring({ score, size, stroke, fontSize }: { score: number; size: number; stroke: number; fontSize: number }) {
  const color = ratingColor(rate('score', score));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-label={`Score ${score} out of 100`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#edf1f7" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${(score / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dy=".35em" textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#0a0f1e" fontFamily="Outfit, sans-serif">{score}</text>
    </svg>
  );
}

function Metric({ label, value, rating, hint }: { label: string; value: string; rating: Rating | null; hint?: string }) {
  return (
    <div className={`${s.metric} ${rClass(rating)}`}>
      <span>{label}</span>
      <b>{value}</b>
      {hint && <em>{hint}</em>}
    </div>
  );
}

function StrategyPanel({ data }: { data: StrategyResult }) {
  const f = data.field;
  return (
    <>
      <div className={s.perf}>
        <div className={s.gauge}>
          <Ring score={data.score} size={150} stroke={12} fontSize={40} />
          <p>Performance score</p>
        </div>
        <div className={s.metrics}>
          <Metric label="Largest Contentful Paint" value={fmtMs(data.lcpMs)} rating={rate('lcp', data.lcpMs)} hint="When the main content shows" />
          <Metric label="Cumulative Layout Shift" value={data.cls === null ? '–' : data.cls.toFixed(2)} rating={rate('cls', data.cls)} hint="How much the page jumps" />
          {f?.inpMs != null ? (
            <Metric label="Interaction to Next Paint" value={fmtMs(f.inpMs)} rating={rate('inp', f.inpMs)} hint="Real visitors, last 28 days" />
          ) : (
            <Metric label="Total Blocking Time" value={fmtMs(data.tbtMs)} rating={rate('tbt', data.tbtMs)} hint="Lab stand-in for INP" />
          )}
          <Metric label="First Contentful Paint" value={fmtMs(data.fcpMs)} rating={rate('fcp', data.fcpMs)} hint="First thing on screen" />
          <Metric label="Speed Index" value={fmtMs(data.speedIndexMs)} rating={rate('si', data.speedIndexMs)} hint="How fast the page fills in" />
          <Metric label="Server response" value={fmtMs(data.serverResponseMs)} rating={rate('ttfb', data.serverResponseMs)} hint="Measured by Google" />
        </div>
      </div>
      {f && (
        <div className={s.fieldStrip}>
          <strong>Real visitors (Chrome, last 28 days{f.scope === 'origin' ? ', whole site' : ''})</strong>
          <span>LCP <b style={{ color: ratingColor(rate('lcp', f.lcpMs)) }}>{fmtMs(f.lcpMs)}</b></span>
          {f.cls !== null && <span>CLS <b style={{ color: ratingColor(rate('cls', f.cls)) }}>{f.cls.toFixed(2)}</b></span>}
          {f.inpMs !== null && <span>INP <b style={{ color: ratingColor(rate('inp', f.inpMs)) }}>{fmtMs(f.inpMs)}</b></span>}
          {f.ttfbMs !== null && <span>TTFB <b style={{ color: ratingColor(rate('ttfb', f.ttfbMs)) }}>{fmtMs(f.ttfbMs)}</b></span>}
        </div>
      )}
    </>
  );
}

// Spinning globe: meridians sweep across to fake rotation; pins pulse where
// the site is served from (one for a server, several for a CDN).
export function Globe({ mode = 'pin', size = 112 }: { mode?: 'pin' | 'cdn' | 'none'; size?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const pins = mode === 'cdn' ? [[44, 46, 0], [76, 54, 0.7], [58, 78, 1.4], [86, 36, 2.1]] : mode === 'pin' ? [[72, 50, 0]] : [];
  return (
    <svg className={s.globe} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id={`g${uid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#7ae8f7" />
          <stop offset=".55" stopColor="#0CC0DF" />
          <stop offset="1" stopColor="#0779a0" />
        </radialGradient>
        <clipPath id={`c${uid}`}><circle cx="60" cy="60" r="40" /></clipPath>
      </defs>
      <circle className={s.orbit} cx="60" cy="60" r="54" fill="none" stroke="#0CC0DF" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="60" cy="60" r="44" fill="#0CC0DF" opacity=".12" />
      <circle cx="60" cy="60" r="40" fill={`url(#g${uid})`} />
      <g clipPath={`url(#c${uid})`} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.1">
        <line x1="20" y1="60" x2="100" y2="60" />
        <path d="M22 44 Q60 52 98 44" />
        <path d="M22 76 Q60 68 98 76" />
        <ellipse cx="60" cy="60" rx="40" ry="40" />
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx="60" cy="60" rx="40" ry="40">
            <animate attributeName="rx" values="40;0;40" dur="8s" begin={`-${i * 2}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </g>
      <ellipse cx="46" cy="40" rx="14" ry="7" fill="#fff" opacity=".18" />
      {pins.map(([x, y, d], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#fff" stroke="none">
            <animate attributeName="r" values="7;3;7" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" />
          </circle>
          <circle cx={x} cy={y} r="3" fill="none" stroke="#fff" strokeWidth="1.5">
            <animate attributeName="r" values="3;13" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".9;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function hostingSummary(h: HostingInfo | null): { label: string; heading: string; body: string; mode: 'pin' | 'cdn' | 'none' } {
  if (!h) return { label: 'Unknown', heading: 'Location unknown', body: 'We could not work out where this site is hosted this time.', mode: 'none' };
  const place = [h.city, h.country].filter((v, i, a) => v && a.indexOf(v) === i).join(', ') || 'an unknown location';
  if (h.cdn && PLATFORMS.includes(h.cdn)) {
    return { label: h.cdn, heading: `Hosted on ${h.cdn}`, mode: 'cdn',
      body: `This site runs on ${h.cdn}'s global platform, so pages are served from their worldwide network rather than one fixed server.` };
  }
  if (h.cdn) {
    return { label: `${h.cdn} CDN`, heading: `Served through ${h.cdn}`, mode: 'cdn',
      body: `Visitors get copies from a nearby edge server (often Auckland or Sydney), while the main server could be anywhere. Pages that can't be cached still travel to the main server.` };
  }
  if (h.countryCode === 'NZ') {
    return { label: 'New Zealand', heading: 'Hosted in New Zealand', mode: 'pin',
      body: `This site's server is in ${place}. Data has a short trip to visitors in New Zealand, which keeps load times down.` };
  }
  return { label: h.country || 'Overseas', heading: `Hosted in ${h.country || 'another country'}`, mode: 'pin',
    body: `This site's server is in ${place}${h.distanceKm ? `, about ${h.distanceKm.toLocaleString('en-NZ')} km from Auckland` : ''}.` +
      (h.estRttMs ? ` Every round trip from a visitor in New Zealand adds roughly ${h.estRttMs} ms, and a page needs several before it appears.` : '') };
}

function HostingCard({ h, nzProbeShown }: { h: HostingInfo | null; nzProbeShown: boolean }) {
  const info = hostingSummary(h);
  return (
    <div className={s.card}>
      <h2 className={s.cardTitle}>Where is this site hosted?</h2>
      <div className={s.hostHead}>
        <Globe mode={info.mode} size={96} />
        <div>
          <h3>{info.heading}</h3>
          {h?.countryCode && !h.cdn && <span className={s.cc}>{h.countryCode}</span>}
        </div>
      </div>
      <p className={s.hostBody}>{info.body}</p>
      {h && (
        <dl className={s.hostFacts}>
          {h.provider && <><dt>Network</dt><dd>{h.provider}</dd></>}
          <dt>IP address</dt><dd>{h.ip}</dd>
          {!h.cdn && h.distanceKm !== null && <><dt>Distance to Auckland</dt><dd>{h.distanceKm.toLocaleString('en-NZ')} km</dd></>}
          {!h.cdn && h.estRttMs !== null && <><dt>Extra latency</dt><dd>~{h.estRttMs} ms per round trip</dd></>}
        </dl>
      )}
      {!nzProbeShown && <p className={s.note}>Coming soon: live load timings measured from a server in Auckland.</p>}
    </div>
  );
}

function Badge({ r }: { r: PublicResult }) {
  const [copied, setCopied] = useState(false);
  const alt = `Grade ${r.grade} on the NZ Website Speed Test`;
  const code = `<a href="${SITE}${TOOL_PATH}/" target="_blank" rel="noopener" title="NZ Website Speed Test by Webhosting NZ"><img src="${SITE}${TOOL_PATH}/badge/${r.id}.svg" alt="${alt}" width="240" height="44" /></a>`;
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className={s.card}>
      <h2 className={s.cardTitle}>Show off your grade</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.badgeImg} src={`${TOOL_PATH}/badge/${r.id}.svg`} alt={alt} width={240} height={44} />
      <p className={s.note}>Paste this code into your website footer or about page:</p>
      <textarea className={s.code} readOnly value={code} onFocus={(e) => e.currentTarget.select()} aria-label="Badge embed code" />
      <div className={s.share}><button type="button" className={s.chip} onClick={copy}>{copied ? 'Copied!' : 'Copy badge code'}</button></div>
    </div>
  );
}

export default function ResultView({ r, device }: { r: PublicResult; device: 'mobile' | 'desktop' }) {
  const [tab, setTab] = useState<'mobile' | 'desktop'>(device);
  const [copied, setCopied] = useState(false);
  useEffect(() => setTab(device), [device]);

  const shareUrl = `${SITE}${TOOL_PATH}/r/${r.id}/`;
  const shareText = `${r.host} scored Grade ${r.grade} on the NZ Website Speed Test`;
  const data = tab === 'mobile' ? r.mobile : r.desktop;
  const h = r.hosting;
  const hostInfo = hostingSummary(h);
  const overseas = !!h && !h.cdn && !!h.countryCode && h.countryCode !== 'NZ';
  const fixes = data?.fixes || [];
  const gradeColor = GRADE_COLORS[r.grade || 'F'];

  return (
    <div className={s.results}>
      <div className={`${s.card} ${s.summaryCard}`}>
        <div className={s.summary}>
          <div className={s.grade} style={{ background: gradeColor, boxShadow: `0 14px 30px ${gradeColor}55` }}>
            <small>GRADE</small>
            <b>{r.grade}</b>
          </div>
          <div className={s.summaryMain}>
            <p className={s.summaryHost}>{r.host}</p>
            <p className={s.summaryMeta}>
              Tested {new Date(r.createdAt).toLocaleString('en-NZ', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Pacific/Auckland' })} NZT
              {r.finalUrl && <> · <a href={r.finalUrl} target="_blank" rel="nofollow noopener">{r.finalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></>}
            </p>
            {r.percentile && r.percentile.sites >= 10 ? (
              <span className={s.pill}>Faster than {r.percentile.fasterThan}% of {r.percentile.sites.toLocaleString('en-NZ')} sites tested</span>
            ) : (
              <span className={s.pill}>Overall score {r.score}/100</span>
            )}
            <div className={s.share}>
              <button type="button" className={s.chip} onClick={() => navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })}>
                {copied ? 'Link copied!' : 'Copy result link'}
              </button>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}>LinkedIn</a>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}>Facebook</a>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X</a>
            </div>
          </div>
          <div className={s.minis}>
            {r.mobile && (
              <button type="button" className={`${s.mini} ${tab === 'mobile' ? s.miniOn : ''}`} onClick={() => setTab('mobile')}>
                <Ring score={r.mobile.score} size={84} stroke={8} fontSize={24} />
                <span><MobileIcon /> Mobile</span>
              </button>
            )}
            {r.desktop && (
              <button type="button" className={`${s.mini} ${tab === 'desktop' ? s.miniOn : ''}`} onClick={() => setTab('desktop')}>
                <Ring score={r.desktop.score} size={84} stroke={8} fontSize={24} />
                <span><DesktopIcon /> Desktop</span>
              </button>
            )}
          </div>
        </div>
        <div className={s.statStrip}>
          <div><span>Overall score</span><b>{r.score}/100</b></div>
          <div><span>Hosted</span><b>{hostInfo.label}</b></div>
          <div><span>Page size ({tab})</span><b>{fmtBytes(data?.pageBytes)}</b></div>
          <div><span>Requests ({tab})</span><b>{data?.requests ?? '–'}</b></div>
          <div><span>Load (LCP, {tab})</span><b style={{ color: ratingColor(rate('lcp', data?.lcpMs ?? null)) }}>{fmtMs(data?.lcpMs)}</b></div>
        </div>
      </div>

      <div className={s.resultsGrid}>
        <div className={s.mainCol}>
          <div className={s.card}>
            <div className={s.cardHead}>
              <h2 className={s.cardTitle}>Core Web Vitals &amp; performance</h2>
              <div className={s.tabs} role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'mobile'} onClick={() => setTab('mobile')}><MobileIcon /> Mobile</button>
                <button type="button" role="tab" aria-selected={tab === 'desktop'} onClick={() => setTab('desktop')}><DesktopIcon /> Desktop</button>
              </div>
            </div>
            {data ? <StrategyPanel data={data} /> : <p>No data for this device.</p>}
          </div>

          {fixes.length > 0 && (
            <div className={s.card}>
              <h2 className={s.cardTitle}>Top fixes for {tab}</h2>
              <ol className={s.fixes}>
                {fixes.map((f) => (
                  <li key={f.key}>
                    <div>
                      <h4>{f.title}{f.savingsMs ? <span className={s.saving}>save ~{fmtMs(f.savingsMs)}</span> : null}</h4>
                      {f.tip && <p>{f.tip}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <aside className={s.sideCol}>
          <HostingCard h={h} nzProbeShown={!!r.nzProbe} />

          {r.nzProbe && (
            <div className={s.card}>
              <h2 className={s.cardTitle}>Timings from {r.nzProbe.location}</h2>
              <div className={s.probe}>
                <Metric label="DNS lookup" value={fmtMs(r.nzProbe.dnsMs)} rating={null} />
                <Metric label="Connect" value={fmtMs(r.nzProbe.connectMs)} rating={null} />
                <Metric label="TLS" value={fmtMs(r.nzProbe.tlsMs)} rating={null} />
                <Metric label="First byte" value={fmtMs(r.nzProbe.ttfbMs)} rating={rate('ttfb', r.nzProbe.ttfbMs)} />
              </div>
            </div>
          )}

          {overseas ? (
            <div className={s.softCta}>
              <h3>Most of your visitors in New Zealand?</h3>
              <p>Your site is served from {h?.country}. Webhosting NZ hosting runs on servers in Auckland, so NZ visitors aren&apos;t waiting on a trip overseas.</p>
              <a className={s.softBtn} href="/web-hosting/">See NZ hosting plans</a>
            </div>
          ) : (r.score ?? 100) < 75 ? (
            <div className={s.softCta}>
              <h3>Want help making it faster?</h3>
              <p>Our team builds fast, lightweight websites for New Zealand businesses, with hosting included.</p>
              <a className={s.softBtn} href="/web-design-service/">See web design</a>
            </div>
          ) : null}

          <Badge r={r} />
        </aside>
      </div>
    </div>
  );
}
