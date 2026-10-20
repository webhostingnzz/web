import type { Metadata } from "next";
import Link from "next/link";
import PricingCards from "../components/PricingCards";
import MigrationTimeline from "./MigrationTimeline";
import heroHtml from "./hero.json";
import s from "./page.module.css";
import {
  COMPARE, DOMAINS, EMAIL, FAQS, HERO, INCLUDED, LINKS, MIGRATION,
  PAGE_PATH, PAGE_URL, PHONE_DISPLAY, PHONE_TEL, PICKER, PLANS, PLAN_TABLE,
  SEO, SITE_URL, SUPPORT, DOMAIN_CO_NZ_YEARLY, DOMAIN_CO_NZ_STANDALONE, money, yearly,
} from "./content";
import { buildJsonLd } from "./schema";
import BlogChrome from "../lib/BlogChrome";
import { webHostingPricing } from "../data/pricingPlans";

const featureIcons = [
  'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5zM12 15v2',
  'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3ZM12 8v5M12 16h.01',
  'M10 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7ZM15 15l6 6M7 10h6M10 7v6',
  'M4 7h16v14H4zM8 7V3h8v4M8 12h8M8 16h5',
  'M3 4h18v16H3zM3 9h18M8 9v11M6 6.5h.01M9 6.5h.01',
  'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  'M3 12h4l3-8 4 16 3-8h4',
  'M4 7h13M13 3l4 4-4 4M20 17H7M11 13l-4 4 4 4',
];

const benefitIcons = [
  'M20 7v5h-5M4 17v-5h5M6 6a8 8 0 0 1 13 3M18 18A8 8 0 0 1 5 15',
  featureIcons[8],
  'M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h5v-7H4ZM20 12h2v7h-5v-7h3ZM20 19c0 2-3 3-6 3',
  'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3ZM9 12l2 2 4-4',
  'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
];

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

      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <section className={s.benefitsSection} aria-labelledby="business-benefits">
        <div className={s.inner}>
          <div className={s.benefitsIntro}>
            <span className={s.sectionLabel}>LESS ADMIN. MORE BUSINESS.</span>
            <h2 id="business-benefits" className={s.h2}>Everything you need.<br /><span>One straightforward price.</span></h2>
            <p>{HERO.intro}</p>
          </div>
          <div className={s.benefitsLayout}>
            <aside className={s.priceSpotlight} aria-label="Hosting starting price">
              <span className={s.priceLabel}>HOSTING FROM</span>
              <div className={s.spotlightAmount}><span>NZ</span>{money(PLANS[0].monthly)}</div>
              <p className={s.spotlightPeriod}>per month · GST included</p>
              <div className={s.priceRule} />
              <strong>{HERO.bullets[0].strong}</strong>
              <p>{HERO.bullets[0].text}</p>
              <Link href="#plans" className={s.btn}>{HERO.cta}<span aria-hidden="true">→</span></Link>
              <span className={s.priceReassurance}>Same price at renewal</span>
            </aside>
            <div className={s.benefitGrid}>
              {HERO.bullets.slice(1, 5).map((b, i) => (
                <article key={b.strong} className={s.benefitCard}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={benefitIcons[i]} /></svg>
                  <div><h3>{b.strong}</h3><p>{b.text}</p></div>
                </article>
              ))}
            </div>
          </div>
          <p className={s.benefitsContact}>{HERO.callPrompt} <a href={PHONE_TEL}>{PHONE_DISPLAY}</a><span aria-hidden="true"> ↗</span></p>
        </div>
      </section>

      {/* Section 2: Plan table */}
      <section className={s.section} id="plans" aria-label={PLAN_TABLE.h2}>
        <div className={s.inner}>
          <div className={s.sharedPricing}>
            <PricingCards data={{ ...webHostingPricing, heading: PLAN_TABLE.h2, subtitle: PLAN_TABLE.note }} />
          </div>
          <h3 className={s.comparisonTitle}>Compare plans at a glance</h3>
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
      <section className={`${s.section} ${s.compareSection}`} aria-labelledby="compare">
        <div className={s.inner}>
          <span className={s.sectionLabel}>COMPARE WITH CONFIDENCE</span>
          <h2 id="compare" className={s.h2}>{COMPARE.h2}</h2>
          <p className={s.sectionIntro}>{COMPARE.lead}</p>
          <ol className={s.compareGrid}>
            {COMPARE.items.map((it, i) => (
              <li key={it.q}><span className={s.compareNumber}>0{i + 1}</span><h3>{it.q}</h3><p>{it.a}</p></li>
            ))}
          </ol>
          <p className={s.guideNote}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 3h13l3 3v15H4zM8 8h8M8 12h8M8 16h5" /></svg>
            <span>{COMPARE.tailLead} <Link href={LINKS.costGuide}>{COMPARE.tailLink} <span aria-hidden="true">↗</span></Link>.</span>
          </p>
        </div>
      </section>

      {/* Section 5: What every plan includes */}
      <section className={`${s.section} ${s.alt}`} aria-labelledby="included">
        <div className={s.inner}>
          <h2 id="included" className={s.h2}>{INCLUDED.h2}</h2>
          <div className={s.featureGrid}>
            {INCLUDED.rows.map(([k, v], i) => (
              <article className={s.featureCard} key={k}><svg className={s.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={featureIcons[i]} /></svg><h3>{k}</h3><p>{v}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Migration */}
      <section className={`${s.section} ${s.migrationSection}`} aria-labelledby="migration">
        <div className={`${s.inner} ${s.migrationGrid}`}>
          <div className={s.migrationIntro}>
          <span className={s.sectionLabel}>WE HANDLE THE MOVE</span>
          <h2 id="migration" className={s.h2}>{MIGRATION.h2}</h2>
          <p>{MIGRATION.lead}</p>
          <div className={s.migrationPromise}><span className={s.promiseValue}>Free migration</span><span>Website, database & email</span></div>
          <p className={s.migrationGuide}>
            {MIGRATION.timeLead} <Link href={LINKS.migrationGuide}>{MIGRATION.timeLink}</Link> {MIGRATION.timeTail}
          </p>
          <div className={s.ctaRow}>
            <Link href={LINKS.plans} className={s.btn}>{MIGRATION.cta}</Link>
          </div>
          </div>
          <MigrationTimeline steps={MIGRATION.steps} />
        </div>
      </section>

      {/* Section 7: Support */}
      <section className={`${s.section} ${s.supportSection}`} aria-labelledby="support">
        <div className={s.inner}>
          <div className={s.supportPanel}>
          <div>
          <span className={s.sectionLabel}>REAL PEOPLE. LOCAL OWNERSHIP.</span>
          <h2 id="support" className={s.h2}>{SUPPORT.h2}</h2>
          <p>{SUPPORT.p1}</p>
          </div>
          <div className={s.contactPanel}>
          <svg className={s.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={benefitIcons[2]} /></svg>
          <h3>Let’s talk hosting</h3>
          <p>
            {SUPPORT.p2Lead} <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> {SUPPORT.p2Mid}{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
          <a className={s.contactLink} href={PHONE_TEL}>{PHONE_DISPLAY}<span aria-hidden="true">↗</span></a>
          <a className={s.contactLink} href={`mailto:${EMAIL}`}>{EMAIL}<span aria-hidden="true">↗</span></a>
          </div>
          <div className={s.locationNote}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={featureIcons[1]} /></svg><p>{SUPPORT.p3}</p></div>
          </div>
        </div>
      </section>

      {/* Section 8: Domains and email */}
      <section className={`${s.section} ${s.domainSection}`} aria-labelledby="domains">
        <div className={s.inner}>
          <span className={s.sectionLabel}>YOUR BUSINESS. YOUR ONLINE ADDRESS.</span>
          <h2 id="domains" className={s.h2}>{DOMAINS.h2}</h2>
          <div className={s.domainGrid}>
          <article className={s.domainCard}>
          <div className={s.domainCardTop}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={featureIcons[1]} /></svg><span>YOUR DOMAIN NAME</span></div>
          <div className={s.domainExtensions}><span>.co.nz</span><span>.nz</span><span>.kiwi.nz</span></div>
          <div className={s.domainPrice}>NZ{money(DOMAIN_CO_NZ_YEARLY)}<span>/ year with hosting</span></div>
          <p className={s.standalonePrice}>NZ{money(DOMAIN_CO_NZ_STANDALONE)} per year without hosting</p>
          <p>
            {DOMAINS.p1Lead} <Link href={LINKS.domain}>{DOMAINS.p1Link}</Link> {DOMAINS.p1Tail}
          </p>
          </article>
          <article className={s.emailCard}>
          <div className={s.domainCardTop}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 5h18v14H3zM3 5l9 8 9-8" /></svg><span>YOUR BUSINESS EMAIL</span></div>
          <div className={s.emailExample}><span>you</span>@yourbusiness.co.nz</div>
          <h3>A professional first impression</h3>
          <p>
            {DOMAINS.p2Lead} <Link href={LINKS.email}>{DOMAINS.p2Link}</Link>.
          </p>
          </article>
          </div>
          <p className={s.bundleSummary}>
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
              <details key={f.q} className={s.faqItem}>
                <summary><h3 className={s.h3}>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
    </BlogChrome>
  );
}
