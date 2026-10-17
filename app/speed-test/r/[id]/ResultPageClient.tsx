'use client';

import BlogChrome from '../../../lib/BlogChrome';
import ResultView, { usePollResult } from '../../ResultView';
import { SpeedTestForm } from '../../SpeedTestClient';
import type { PublicResult } from '../../../lib/speedtest/types';
import s from '../../speedtest.module.css';

export default function ResultPageClient({ initial }: { initial: PublicResult }) {
  const { result, error } = usePollResult(initial.id, initial);
  const r = result || initial;
  return (
    <BlogChrome>
      <div className={s.page}>
        <section className={`${s.hero} ${s.heroCompact}`}>
          <div className={`${s.wrap} ${s.heroInner}`} style={{ maxWidth: 980 }}>
            <h1 className={s.h1} style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}>
              Speed test results <span>{r.host}</span>
            </h1>
            {r.status === 'running' && !error && (
              <div className={s.progress}>
                <p className={s.progressTitle}>This test is still running… the page updates by itself.</p>
                <div className={s.bar}><span style={{ width: '60%' }} /></div>
              </div>
            )}
            {(error || r.status === 'failed') && <div className={s.error} role="alert">{error || r.error}</div>}
            {r.status === 'done' && <ResultView r={r} device="mobile" />}
          </div>
        </section>
        <section className={s.section} style={{ paddingTop: 30 }}>
          <div className={s.wrap} style={{ textAlign: 'center' }}>
            <h2 className={s.h2}>Test another website</h2>
            <p className={s.sub} style={{ marginBottom: 24 }}>Free NZ Website Speed Test from <a href="/speed-test/" style={{ color: '#09a6c1' }}>Webhosting NZ</a>.</p>
            <SpeedTestForm compact />
          </div>
        </section>
      </div>
    </BlogChrome>
  );
}
