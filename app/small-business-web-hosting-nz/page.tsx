import type { Metadata } from "next";
import Link from "next/link";
import s from "./page.module.css";
import {
  CLOSING, COMPARE, DOMAINS, EMAIL, FAQS, HERO, INCLUDED, LINKS, MIGRATION,
  PAGE_PATH, PAGE_URL, PHONE_DISPLAY, PHONE_TEL, PICKER, PLANS, PLAN_TABLE,
  SEO, SITE_URL, SUPPORT, money, yearly,
} from "./content";
import { buildJsonLd } from "./schema";
import BlogChrome from "../lib/BlogChrome";

// Static page: no data fetching, so Next.js prerenders it at build time.
// The live site has no main landmark, so this page provides its own.
// BlogChrome adds the shared site header and footer around it.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // "absolute" so a title template in the root layout is not appended twice.
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Webhosting NZ",
    title: SEO.title,
    description: SEO.description,
    locale: "en_NZ",
    images: [{ url: SEO.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
  },
};

export default function SmallBusinessWebHostingPage() {
  const jsonLd = buildJsonLd();

  return (
    <BlogChrome>
    <main className={s.page}>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className={s.breadcrumb}>
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href={LINKS.plans}>Web Hosting</Link></li>
          <li aria-current="page">Small Business Web Hosting NZ</li>
        </ol>
      </nav>

      {/* Section 1: Hero */}
      <section className={`${s.section} ${s.hero}`}>
        <div className={s.inner}>
          <h1 className={s.h1}>{HERO.h1}</h1>
          <p className={s.lead}>{HERO.intro}</p>
          <p>{HERO.sub}</p>
          <ul className={s.ticks}>
            {HERO.bullets.map((b) => (
              <li key={b.strong}><strong>{b.strong}</strong> {b.text}</li>
            ))}
          </ul>
          <div className={s.ctaRow}>
            <Link href={LINKS.plans} className={s.btn}>{HERO.cta}</Link>
            <p className={s.ctaNote}>
              {HERO.callPrompt} <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Plan table */}
      <section className={s.section} aria-labelledby="plans">
        <div className={s.inner}>
          <h2 id="plans" className={s.h2}>{PLAN_TABLE.h2}</h2>
          <p>{PLAN_TABLE.note}</p>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Websites</th>
                  <th scope="col">Storage</th>
                  <th scope="col">Email</th>
                  <th scope="col">Per month (GST incl)</th>
                  <th scope="col">Per year (GST incl)</th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((p, i) => (
                  <tr key={p.name}>
                    <th scope="row">{p.name}</th>
                    <td>{p.websites}</td>
                    <td>{p.storage}</td>
                    <td>{p.email}</td>
                    <td>{i === 0 ? <strong>{money(p.monthly)}</strong> : money(p.monthly)}</td>
                    <td>{money(yearly(p.monthly))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {PLAN_TABLE.after} <Link href={LINKS.plans}>{PLAN_TABLE.afterLink}</Link>.
          </p>
        </div>
      </section>

      {/* Section 3: Plan picker */}
      <section className={`${s.section} ${s.alt}`} aria-labelledby="picker">
        <div className={s.inner}>
          <h2 id="picker" className={s.h2}>{PICKER.h2}</h2>
          <ul className={s.cards}>
            {PLANS.map((p) => (
              <li key={p.name} className={s.card}>
                <p className={s.cardTitle}>
                  <a href={p.storeUrl}>{p.name}</a>, {money(p.monthly)} a month,{" "}
                  {p.websites === "1" ? "1 website" : p.websites === "Unlimited" ? "unlimited websites" : `up to ${p.websites} websites`}.
                </p>
                <p>{p.pickerText}</p>
              </li>
            ))}
          </ul>
          <p>
            {PICKER.wordpressLead} <Link href={LINKS.wordpress}>{PICKER.wordpressLink}</Link> {PICKER.wordpressTail}
          </p>
          <p>
            {PICKER.growLead} <Link href={LINKS.hostingTypes}>{PICKER.growLink}</Link> {PICKER.growTail}
          </p>
        </div>
      </section>

      {/* Section 4: What to check before you compare */}
      <section className={s.section} aria-labelledby="compare">
        <div className={s.inner}>
          <h2 id="compare" className={s.h2}>{COMPARE.h2}</h2>
          <p>{COMPARE.lead}</p>
          <ol className={s.numbered}>
            {COMPARE.items.map((it) => (
              <li key={it.q}><strong>{it.q}</strong> {it.a}</li>
            ))}
          </ol>
          <p>
            {COMPARE.tailLead} <Link href={LINKS.costGuide}>{COMPARE.tailLink}</Link>.
          </p>
        </div>
      </section>

      {/* Section 5: What every plan includes */}
      <section className={`${s.section} ${s.alt}`} aria-labelledby="included">
        <div className={s.inner}>
          <h2 id="included" className={s.h2}>{INCLUDED.h2}</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr><th scope="col">Included</th><th scope="col">What it does for you</th></tr>
              </thead>
              <tbody>
                {INCLUDED.rows.map(([k, v]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Migration */}
      <section className={s.section} aria-labelledby="migration">
        <div className={s.inner}>
          <h2 id="migration" className={s.h2}>{MIGRATION.h2}</h2>
          <p>{MIGRATION.lead}</p>
          <ol className={s.numbered}>
            {MIGRATION.steps.map((st) => <li key={st}>{st}</li>)}
          </ol>
          <p>
            {MIGRATION.timeLead} <Link href={LINKS.migrationGuide}>{MIGRATION.timeLink}</Link> {MIGRATION.timeTail}
          </p>
          <div className={s.ctaRow}>
            <Link href={LINKS.plans} className={s.btn}>{MIGRATION.cta}</Link>
          </div>
        </div>
      </section>

      {/* Section 7: Support */}
      <section className={`${s.section} ${s.alt}`} aria-labelledby="support">
        <div className={s.inner}>
          <h2 id="support" className={s.h2}>{SUPPORT.h2}</h2>
          <p>{SUPPORT.p1}</p>
          <p>
            {SUPPORT.p2Lead} <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> {SUPPORT.p2Mid}{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
          <p>{SUPPORT.p3}</p>
        </div>
      </section>

      {/* Section 8: Domains and email */}
      <section className={s.section} aria-labelledby="domains">
        <div className={s.inner}>
          <h2 id="domains" className={s.h2}>{DOMAINS.h2}</h2>
          <p>
            {DOMAINS.p1Lead} <Link href={LINKS.domain}>{DOMAINS.p1Link}</Link> {DOMAINS.p1Tail}
          </p>
          <p>
            {DOMAINS.p2Lead} <Link href={LINKS.email}>{DOMAINS.p2Link}</Link>.
          </p>
          <p>
            {DOMAINS.p3Lead} <strong>{DOMAINS.p3Strong}</strong> {DOMAINS.p3Mid}{" "}
            <Link href={LINKS.domainRenewals}>{DOMAINS.p3Link}</Link>.
          </p>
        </div>
      </section>

      {/* Section 9: FAQ (same text as the FAQPage JSON-LD) */}
      <section className={`${s.section} ${s.alt}`} aria-labelledby="faq">
        <div className={s.inner}>
          <h2 id="faq" className={s.h2}>Frequently asked questions</h2>
          <div className={s.faq}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem} open>
                <summary><h3 className={s.h3}>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Closing CTA */}
      <section className={`${s.section} ${s.closing}`} aria-labelledby="start">
        <div className={s.inner}>
          <h2 id="start" className={s.h2}>{CLOSING.h2}</h2>
          <p>{CLOSING.p}</p>
          <div className={s.ctaRow}>
            <Link href={LINKS.plans} className={s.btn}>{CLOSING.cta}</Link>
          </div>
          <p className={s.ctaNote}>
            {CLOSING.talkLead} <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> {CLOSING.talkMid}{" "}
            <Link href={LINKS.contact}>{CLOSING.talkLink}</Link>.
          </p>
        </div>
      </section>
    </main>
    </BlogChrome>
  );
}
