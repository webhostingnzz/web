'use client';

import { useEffect, useState } from 'react';
import s from './speedtest.module.css';
import { GRADE_COLORS, rate, type Rating } from '../lib/speedtest/grade';
import type { HostingInfo, PublicResult, StrategyResult } from '../lib/speedtest/types';

export const SITE = 'https://webhosting.co.nz';
const PLATFORMS = ['Shopify', 'Wix', 'Squarespace', 'WordPress.com', 'Vercel', 'Netlify'];

export function fmtMs(v: number | null | undefined): string {
  if (v === null || v === undefined) return '–';
  return v >= 1000 ? `${(v / 1000).toFixed(1)} s` : `${Math.round(v)} ms`;
}
function fmtBytes(v: number | null): string {
  if (v === null) return '–';
  return v >= 1024 * 1024 ? `${(v / 1024 / 1024).toFixed(1)} MB` : `${Math.round(v / 1024)} KB`;
}
function flag(cc: string | null): string {
  if (!cc || !/^[A-Z]{2}$/i.test(cc)) return '🌐';
  return String.fromCodePoint(...cc.toUpperCase().split('').map((c) => 0x1f1a5 + c.charCodeAt(0)));
}
const rClass = (r: Rating | null) => (r === 'good' ? s.rgood : r === 'ok' ? s.rok : r === 'poor' ? s.rpoor : s.rnone);

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

function Gauge({ score }: { score: number }) {
  const r = rate('score', score);
  const color = r === 'good' ? '#16a34a' : r === 'ok' ? '#d97706' : '#dc2626';
  const c = 2 * Math.PI * 52;
  return (
    <div className={s.gauge}>
      <svg viewBox="0 0 120 120" aria-label={`Performance score ${score} out of 100`}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="#edf1f7" strokeWidth="10" />
        <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${(score / 100) * c} ${c}`} transform="rotate(-90 60 60)" />
        <text x="60" y="68" textAnchor="middle" fontSize="30" fontWeight="700" fill="#0a0f1e" fontFamily="Outfit, sans-serif">{score}</text>
      </svg>
      <p>Performance score</p>
    </div>
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
        <Gauge score={data.score} />
        <div className={s.metrics}>
          <Metric label="Largest Contentful Paint (LCP)" value={fmtMs(data.lcpMs)} rating={rate('lcp', data.lcpMs)} hint="When the main content shows" />
          <Metric label="Cumulative Layout Shift (CLS)" value={data.cls === null ? '–' : data.cls.toFixed(2)} rating={rate('cls', data.cls)} hint="How much the page jumps" />
          {f?.inpMs != null ? (
            <Metric label="Interaction to Next Paint (INP)" value={fmtMs(f.inpMs)} rating={rate('inp', f.inpMs)} hint="Real visitors, last 28 days" />
          ) : (
            <Metric label="Total Blocking Time (INP proxy)" value={fmtMs(data.tbtMs)} rating={rate('tbt', data.tbtMs)} hint="Lab stand-in for INP" />
          )}
          <Metric label="First Contentful Paint" value={fmtMs(data.fcpMs)} rating={rate('fcp', data.fcpMs)} hint="First thing on screen" />
          <Metric label="Server response" value={fmtMs(data.serverResponseMs)} rating={rate('ttfb', data.serverResponseMs)} hint="Measured by Google" />
          <Metric label="Page size" value={fmtBytes(data.pageBytes)} rating={null} hint={data.requests ? `${data.requests} requests` : undefined} />
        </div>
      </div>
      {f && (
        <p className={s.note}>
          Real-visitor data (Chrome users, last 28 days{f.scope === 'origin' ? ', whole site' : ''}): LCP {fmtMs(f.lcpMs)}
          {f.cls !== null ? `, CLS ${f.cls.toFixed(2)}` : ''}{f.inpMs !== null ? `, INP ${fmtMs(f.inpMs)}` : ''}.
        </p>
      )}
    </>
  );
}

function HostingCard({ h, nzProbeShown }: { h: HostingInfo | null; nzProbeShown: boolean }) {
  if (!h) {
    return (
      <div className={s.card}>
        <h2 className={s.cardTitle}>Where is this site hosted?</h2>
        <p>We could not work out where this site is hosted this time.</p>
      </div>
    );
  }
  const place = [h.city, h.country].filter(Boolean).join(', ') || 'an unknown location';
  let heading: string;
  let body: string;
  if (h.cdn && PLATFORMS.includes(h.cdn)) {
    heading = `Hosted on ${h.cdn}`;
    body = `This site runs on ${h.cdn}'s global platform, so pages are served from their worldwide network and we can't see one fixed server location.`;
  } else if (h.cdn) {
    heading = `Served through ${h.cdn}`;
    body = `This site uses the ${h.cdn} network. Visitors are usually served copies from a nearby edge server (often Auckland or Sydney), while the main server could be anywhere. Pages that can't be cached still travel to the main server.`;
  } else if (h.countryCode === 'NZ') {
    heading = `Hosted in New Zealand ${flag('NZ')}`;
    body = `This site's server is in ${place}. Data has a short trip to visitors in New Zealand, which keeps load times down.`;
  } else {
    heading = `Hosted in ${h.country || 'another country'}`;
    body = `This site's server is in ${place}${h.distanceKm ? `, about ${h.distanceKm.toLocaleString('en-NZ')} km from Auckland` : ''}. ` +
      (h.estRttMs ? `Every round trip from a visitor in New Zealand adds roughly ${h.estRttMs} ms, and a page needs several round trips before it appears.` : '');
  }
  return (
    <div className={s.card}>
      <h2 className={s.cardTitle}>Where is this site hosted?</h2>
      <div className={s.hostRow}>
        <div className={s.flag} aria-hidden="true">{h.cdn ? '🌐' : flag(h.countryCode)}</div>
        <div>
          <h3>{heading}</h3>
          <p>{body}</p>
          <div className={s.hostFacts}>
            {h.provider && <span className={s.fact}>Network: <b>{h.provider}</b></span>}
            <span className={s.fact}>IP: <b>{h.ip}</b></span>
            {!h.cdn && h.distanceKm !== null && <span className={s.fact}>Distance to Auckland: <b>{h.distanceKm.toLocaleString('en-NZ')} km</b></span>}
            {!h.cdn && h.estRttMs !== null && <span className={s.fact}>Approx. extra latency: <b>~{h.estRttMs} ms</b> per round trip</span>}
          </div>
          {!nzProbeShown && <p className={s.note}>Coming soon: live load timings measured from a server in Auckland.</p>}
        </div>
      </div>
    </div>
  );
}

function Badge({ r }: { r: PublicResult }) {
  const [copied, setCopied] = useState(false);
  const alt = `Grade ${r.grade} on the NZ Website Speed Test`;
  const code = `<a href="${SITE}/speed-test/" target="_blank" rel="noopener" title="NZ Website Speed Test by Webhosting NZ"><img src="${SITE}/speed-test/badge/${r.id}.svg" alt="${alt}" width="240" height="44" /></a>`;
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className={s.card}>
      <h2 className={s.cardTitle}>Show off your grade</h2>
      <div className={s.badgeRow}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/speed-test/badge/${r.id}.svg`} alt={alt} width={240} height={44} />
        <div>
          <p className={s.note} style={{ marginTop: 0 }}>Paste this code into your website footer or about page:</p>
          <textarea className={s.code} readOnly value={code} onFocus={(e) => e.currentTarget.select()} aria-label="Badge embed code" />
          <div className={s.share}><button type="button" className={s.chip} onClick={copy}>{copied ? 'Copied!' : 'Copy badge code'}</button></div>
        </div>
      </div>
    </div>
  );
}

export default function ResultView({ r, device }: { r: PublicResult; device: 'mobile' | 'desktop' }) {
  const [tab, setTab] = useState<'mobile' | 'desktop'>(device);
  const [copied, setCopied] = useState(false);
  useEffect(() => setTab(device), [device]);

  const shareUrl = `${SITE}/speed-test/r/${r.id}/`;
  const shareText = `${r.host} scored Grade ${r.grade} on the NZ Website Speed Test`;
  const data = tab === 'mobile' ? r.mobile : r.desktop;
  const h = r.hosting;
  const overseas = !!h && !h.cdn && !!h.countryCode && h.countryCode !== 'NZ';
  const fixes = data?.fixes || [];

  return (
    <div className={s.results}>
      <div className={s.card}>
        <div className={s.summary}>
          <div className={s.grade} style={{ background: GRADE_COLORS[r.grade || 'F'] }}>
            <small>GRADE</small>
            <b>{r.grade}</b>
          </div>
          <div>
            <p className={s.summaryHost}>{r.host}</p>
            <p className={s.summaryMeta}>
              Tested {new Date(r.createdAt).toLocaleString('en-NZ', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Pacific/Auckland' })} NZT
            </p>
            <p className={s.summaryLine}>
              Overall score <b>{r.score}/100</b> (mobile {r.mobile?.score}, desktop {r.desktop?.score})
            </p>
            {r.percentile && r.percentile.sites >= 10 && (
              <p className={s.summaryLine}>
                Faster than <b>{r.percentile.fasterThan}%</b> of the {r.percentile.sites.toLocaleString('en-NZ')} sites tested so far.
              </p>
            )}
            <div className={s.share}>
              <button type="button" className={s.chip} onClick={() => navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })}>
                {copied ? 'Link copied!' : 'Copy result link'}
              </button>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}>Share on LinkedIn</a>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}>Facebook</a>
              <a className={s.chip} target="_blank" rel="noopener" href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X</a>
            </div>
          </div>
        </div>
      </div>

      <div className={s.card}>
        <div className={s.tabs} role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'mobile'} onClick={() => setTab('mobile')}>📱 Mobile</button>
          <button type="button" role="tab" aria-selected={tab === 'desktop'} onClick={() => setTab('desktop')}>🖥️ Desktop</button>
        </div>
        {data ? <StrategyPanel data={data} /> : <p>No data for this device.</p>}
      </div>

      <HostingCard h={h} nzProbeShown={!!r.nzProbe} />

      {r.nzProbe && (
        <div className={s.card}>
          <h2 className={s.cardTitle}>Load timings from {r.nzProbe.location}</h2>
          <div className={s.probe}>
            <Metric label="DNS lookup" value={fmtMs(r.nzProbe.dnsMs)} rating={null} />
            <Metric label="Connect" value={fmtMs(r.nzProbe.connectMs)} rating={null} />
            <Metric label="TLS" value={fmtMs(r.nzProbe.tlsMs)} rating={null} />
            <Metric label="First byte" value={fmtMs(r.nzProbe.ttfbMs)} rating={rate('ttfb', r.nzProbe.ttfbMs)} />
            <Metric label="Total" value={fmtMs(r.nzProbe.totalMs)} rating={null} />
          </div>
        </div>
      )}

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

      {overseas ? (
        <div className={s.softCta}>
          <div>
            <h3>Most of your visitors are in New Zealand?</h3>
            <p>Your site is served from {h?.country}. Webhosting NZ hosting runs on servers in Auckland, so NZ visitors aren&apos;t waiting on a trip overseas.</p>
          </div>
          <a className={s.softBtn} href="/web-hosting/">See NZ hosting plans</a>
        </div>
      ) : (r.score ?? 100) < 75 ? (
        <div className={s.softCta}>
          <div>
            <h3>Want help making it faster?</h3>
            <p>Our team builds fast, lightweight websites for New Zealand businesses, with hosting included.</p>
          </div>
          <a className={s.softBtn} href="/web-design-service/">See web design</a>
        </div>
      ) : null}

      <Badge r={r} />
    </div>
  );
}
