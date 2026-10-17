'use client';

import { useEffect, useState } from 'react';
import BlogChrome from '../lib/BlogChrome';
import ResultView, { DesktopIcon, Globe, MobileIcon, usePollResult } from './ResultView';
import { SPEED_TEST_FAQ } from './faq';
import s from './speedtest.module.css';

type Device = 'mobile' | 'desktop';

const STEPS = [
  'Finding where the site is hosted',
  'Running the mobile test',
  'Running the desktop test',
  'Working out your grade',
];

function Progress({ host }: { host: string }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);
  // Google usually needs 15–40 s; ease towards 95% so the bar never stalls at 100.
  const pct = Math.min(95, Math.round(100 * (1 - Math.exp(-elapsed / 18))));
  const now = elapsed < 3 ? 0 : elapsed < 14 ? 1 : elapsed < 26 ? 2 : 3;
  return (
    <div className={s.progress} role="status" aria-live="polite">
      <p className={s.progressTitle}>Testing {host}… this usually takes 20–40 seconds</p>
      <div className={s.bar}><span style={{ width: `${pct}%` }} /></div>
      <ul className={s.steps}>
        {STEPS.map((step, i) => (
          <li key={step} className={i < now ? s.stepDone : i === now ? s.stepNow : undefined}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export function SpeedTestForm({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState<Device>('mobile');
  const [busy, setBusy] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const { result, error: pollError } = usePollResult(id);

  const running = busy || (!!id && (!result || result.status === 'running') && !pollError);

  useEffect(() => {
    if (result?.status === 'done') {
      window.history.replaceState(null, '', `/website-speed-tester/r/${result.id}/`);
    }
  }, [result]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (running) return;
    setStartError(null);
    setId(null);
    setBusy(true);
    try {
      const res = await fetch('/api/speed-test/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.id) {
        setStartError(json.error || 'Something went wrong. Please try again.');
      } else {
        setId(json.id);
      }
    } catch {
      setStartError('Could not reach the speed test. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  const failed = result?.status === 'failed' ? result.error : null;
  const shownError = startError || pollError || failed;
  const hostLabel = url.replace(/^https?:\/\//i, '').replace(/\/.*$/, '') || 'your site';

  return (
    <>
      <form className={s.form} onSubmit={submit} noValidate>
        <label htmlFor="st-url" className="screen-reader-text" style={{ position: 'absolute', left: -9999 }}>Website address</label>
        <input
          id="st-url"
          className={s.input}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="Enter your website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={running}
          required
        />
        <button className={s.btn} type="submit" disabled={running || !url.trim()}>
          {running ? 'Testing…' : 'Test Now'}
        </button>
      </form>
      {!compact && (
        <div className={s.formMeta}>
          <div className={s.device}>
            <strong>Show results for:</strong>
            <div className={s.toggle}>
              <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}><DesktopIcon /> Desktop</button>
              <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}><MobileIcon /> Mobile</button>
            </div>
          </div>
          <span>Free to use · No sign-up required</span>
        </div>
      )}
      {shownError && <div className={s.error} role="alert">{shownError}</div>}
      {running && <Progress host={hostLabel} />}
      {result?.status === 'done' && <ResultView r={result} device={device} />}
    </>
  );
}

function MonitorArt() {
  return (
    <svg viewBox="0 0 400 260" aria-hidden="true">
      <rect x="40" y="16" width="320" height="196" rx="12" fill="#0a0f1e" />
      <rect x="50" y="26" width="300" height="176" rx="6" fill="#fff" />
      <rect x="50" y="26" width="300" height="20" rx="6" fill="#eef6f9" />
      <circle cx="62" cy="36" r="3" fill="#f87171" /><circle cx="72" cy="36" r="3" fill="#fbbf24" /><circle cx="82" cy="36" r="3" fill="#34d399" />
      <circle cx="130" cy="118" r="44" fill="none" stroke="#edf1f7" strokeWidth="12" />
      <circle cx="130" cy="118" r="44" fill="none" stroke="#0CC0DF" strokeWidth="12" strokeLinecap="round" strokeDasharray="230 277" transform="rotate(-90 130 118)" />
      <text x="130" y="127" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0a0f1e" fontFamily="Outfit, sans-serif">92</text>
      <rect x="200" y="70" width="120" height="10" rx="5" fill="#edf1f7" /><rect x="200" y="70" width="96" height="10" rx="5" fill="#16a34a" />
      <rect x="200" y="96" width="120" height="10" rx="5" fill="#edf1f7" /><rect x="200" y="96" width="70" height="10" rx="5" fill="#0CC0DF" />
      <rect x="200" y="122" width="120" height="10" rx="5" fill="#edf1f7" /><rect x="200" y="122" width="50" height="10" rx="5" fill="#d97706" />
      <rect x="200" y="148" width="120" height="10" rx="5" fill="#edf1f7" /><rect x="200" y="148" width="104" height="10" rx="5" fill="#16a34a" />
      <path d="M170 212 h60 l10 30 h-80 z" fill="#c9d3df" />
      <rect x="140" y="240" width="120" height="8" rx="4" fill="#b6c2d1" />
    </svg>
  );
}

function ChecklistArt() {
  const rows = [['#dc2626', 150], ['#d97706', 120], ['#d97706', 170], ['#16a34a', 110]] as const;
  return (
    <svg viewBox="0 0 400 260" aria-hidden="true">
      <rect x="60" y="20" width="280" height="180" rx="10" fill="#0a0f1e" />
      <rect x="70" y="30" width="260" height="160" rx="5" fill="#fff" />
      <rect x="86" y="44" width="110" height="12" rx="6" fill="#0a0f1e" opacity=".85" />
      <rect x="262" y="42" width="52" height="16" rx="8" fill="#0CC0DF" />
      {rows.map(([c, w], i) => (
        <g key={i}>
          <circle cx="96" cy={86 + i * 26} r="7" fill={c} opacity=".9" />
          <rect x="112" y={81 + i * 26} width={w} height="10" rx="5" fill="#dfe6ee" />
          <rect x="282" y={81 + i * 26} width="32" height="10" rx="5" fill="#eef6f9" />
        </g>
      ))}
      <path d="M30 200 h340 l-24 26 h-292 z" fill="#c9d3df" />
    </svg>
  );
}

export default function SpeedTestClient() {
  return (
    <BlogChrome>
      <div className={s.page}>
        <section className={s.hero}>
          <div className={`${s.wrap} ${s.heroInner}`}>
            <p className={s.eyebrow}>Free NZ Website Speed Tester</p>
            <h1 className={s.h1}>Find out why your website is slow <span>Make it faster.</span></h1>
            <p className={s.lead}>Check your website&apos;s speed from a New Zealand point of view and get practical ways to improve performance.</p>
            <SpeedTestForm />
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <h2 className={`${s.h2} ${s.center}`}>How it works</h2>
            <p className={`${s.sub} ${s.center}`}>Get your website speed results in three simple steps.</p>
            <div className={s.how}>
              <div className={s.howItem}>
                <div className={s.howNum}>1</div>
                <h3>Enter your website URL</h3>
                <p>Type in the address of the website you want to test.</p>
              </div>
              <div className={s.howItem}>
                <div className={s.howNum}>2</div>
                <h3>Run the speed test</h3>
                <p>We analyse your website&apos;s performance on desktop and mobile, and find where it&apos;s hosted.</p>
              </div>
              <div className={s.howItem}>
                <div className={s.howNum}>3</div>
                <h3>Review your results</h3>
                <p>See your grade and speed results, and get practical tips to make your site faster.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={`${s.wrap} ${s.feature}`}>
            <div className={s.illustration}><MonitorArt /></div>
            <div className={s.featureText}>
              <h2 className={s.h2}>Understand your website&apos;s performance</h2>
              <p>See how quickly your website loads and what affects the experience for your visitors in New Zealand.</p>
              <ul className={s.checks}>
                <li>Performance score and load time</li>
                <li>Page size and total requests</li>
                <li>Core Web Vitals insights</li>
                <li>Hosting location and distance to Auckland</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionSoft}`}>
          <div className={`${s.wrap} ${s.feature} ${s.featureFlip}`}>
            <div className={s.featureText}>
              <h2 className={s.h2}>Turn insights into a faster website</h2>
              <p>Discover what&apos;s slowing your website down and get clear recommendations to improve it.</p>
              <ul className={s.checks}>
                <li>Find large images and heavy files</li>
                <li>Identify caching and script issues</li>
                <li>Prioritise the improvements that matter</li>
              </ul>
            </div>
            <div className={s.illustration}><ChecklistArt /></div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <h2 className={`${s.h2} ${s.center}`}>Why website speed matters for NZ businesses</h2>
            <p className={`${s.sub} ${s.center}`}>A slow site costs you rankings, enquiries and sales. Here&apos;s what a faster site gets you.</p>
            <div className={s.why}>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
                </div>
                <h3>Better Google rankings</h3>
                <p>Google uses Core Web Vitals as a ranking signal. Faster pages give you an edge over slower competitors in New Zealand search results.</p>
              </div>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" /></svg>
                </div>
                <h3>More enquiries and sales</h3>
                <p>Every extra second of loading makes visitors more likely to leave, especially on mobile. A fast site keeps people around long enough to call, book or buy.</p>
              </div>
              <div className={s.whyCard}>
                <div className={s.whyIcon}><Globe mode="pin" size={40} /></div>
                <h3>Hosting close to your customers</h3>
                <p>Most Kiwi websites serve visitors in New Zealand. If the server is in the US or Europe, every request travels over 10,000 km, adding delay before anything appears.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionSoft}`}>
          <article className={`${s.wrap} ${s.prose}`}>
            <h2>What our website speed tester checks</h2>
            <p>
              The Webhosting NZ website speed tester runs Google PageSpeed Insights (Lighthouse) on both mobile and desktop, then adds
              something most speed tests leave out: where your website is hosted and how far that is from your visitors in New Zealand.
              You get an A to F grade, your Core Web Vitals, and a short list of fixes written in plain English.
            </p>
            <h3>Core Web Vitals explained</h3>
            <div className={s.tableWrap}>
              <table className={s.vitals}>
                <thead>
                  <tr><th>Metric</th><th>What it measures</th><th>Good</th><th>Poor</th></tr>
                </thead>
                <tbody>
                  <tr><td>Largest Contentful Paint (LCP)</td><td>How long until the main content is visible</td><td>2.5 s or less</td><td>over 4 s</td></tr>
                  <tr><td>Interaction to Next Paint (INP)</td><td>How quickly the page reacts to taps and clicks</td><td>200 ms or less</td><td>over 500 ms</td></tr>
                  <tr><td>Cumulative Layout Shift (CLS)</td><td>How much the page jumps around while loading</td><td>0.1 or less</td><td>over 0.25</td></tr>
                </tbody>
              </table>
            </div>
            <h3>How your grade is calculated</h3>
            <p>
              Your grade combines the Google performance scores for mobile (60%) and desktop (40%). Mobile counts for more because most
              New Zealanders browse on their phones. A is 90 or above, B is 75 to 89, C is 60 to 74, D is 45 to 59, and anything lower is F.
            </p>
            <h3>Why hosting location matters in New Zealand</h3>
            <p>
              New Zealand is a long way from the big hosting hubs. A server in Singapore is about 8,400 km from Auckland, and one in the
              United States is more than 10,000 km away. Each round trip adds delay, and a page needs several before it shows. Hosting in
              New Zealand, or using a CDN with local edge locations, keeps that trip short. Compare our{' '}
              <a href="/web-hosting/">NZ web hosting</a> and <a href="/wordpress-hosting/">WordPress hosting</a> plans if your site is hosted overseas.
            </p>
            <h3>How to make your website faster</h3>
            <p>
              Start with the fixes at the top of your results. The most common wins are compressing images, removing unused plugins and
              scripts, turning on page caching and choosing hosting close to your visitors. If you would rather have it done for you, our{' '}
              <a href="/web-design-service/">web design team</a> builds fast, lightweight sites for New Zealand businesses, and our{' '}
              <a href="/blog/">blog</a> has more guides on hosting and performance.
            </p>
          </article>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <h2 className={`${s.h2} ${s.center}`} style={{ marginBottom: 28 }}>Frequently Asked Questions</h2>
            <div className={s.faq}>
              {SPEED_TEST_FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BlogChrome>
  );
}
