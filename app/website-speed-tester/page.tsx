import SpeedTestClient from './SpeedTestClient';
import JsonLd from '../components/JsonLd';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { SPEED_TEST_FAQ } from './faq';

const SITE = 'https://webhosting.co.nz';
const PAGE_URL = `${SITE}/website-speed-tester/`;
const OG_IMAGE = `${SITE}/website-speed-tester/opengraph-image`;

export async function generateMetadata() {
  const seo = await getSeoMetadata('website-speed-tester');
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      'website speed tester', 'website speed test NZ', 'page speed test', 'site speed checker',
      'Core Web Vitals test', 'PageSpeed Insights', 'website hosting location', 'NZ web hosting',
    ],
    alternates: { canonical: '/website-speed-tester/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: '/website-speed-tester/',
      siteName: 'Webhosting NZ',
      locale: 'en_NZ',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

// One @graph so the page, tool, how-to, FAQ and breadcrumbs link to each other.
function schemaGraph() {
  const org = { '@id': `${SITE}/#organization` };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'Webhosting NZ',
        url: SITE,
        logo: `${SITE}/images/logo.webp`,
      },
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: 'Free NZ Website Speed Tester',
        description: 'Test your website speed from a New Zealand point of view: Google PageSpeed scores, Core Web Vitals, hosting location and plain-English fixes.',
        inLanguage: 'en-NZ',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'Webhosting NZ', publisher: org },
        primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 630 },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
        mainEntity: { '@id': `${PAGE_URL}#app` },
        publisher: org,
      },
      {
        '@type': 'WebApplication',
        '@id': `${PAGE_URL}#app`,
        name: 'NZ Website Speed Tester',
        url: PAGE_URL,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Website performance testing',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript and a modern web browser',
        isAccessibleForFree: true,
        inLanguage: 'en-NZ',
        areaServed: { '@type': 'Country', name: 'New Zealand' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' },
        featureList: [
          'Google PageSpeed Insights performance score for mobile and desktop',
          'Core Web Vitals: LCP, INP and CLS',
          'Hosting location and distance to Auckland',
          'A to F speed grade',
          'Plain-English fixes',
          'Shareable results and embeddable badge',
        ],
        image: OG_IMAGE,
        provider: org,
        publisher: org,
      },
      {
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to test your website speed',
        description: 'Check how fast your website loads for visitors in New Zealand in three steps.',
        totalTime: 'PT1M',
        tool: { '@type': 'HowToTool', name: 'NZ Website Speed Tester' },
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter your website URL', text: 'Type in the address of the website you want to test.', url: `${PAGE_URL}#st-url` },
          { '@type': 'HowToStep', position: 2, name: 'Run the speed test', text: 'Press Test Now. We analyse performance on mobile and desktop and find where the site is hosted.' },
          { '@type': 'HowToStep', position: 3, name: 'Review your results', text: 'See your A to F grade, Core Web Vitals and the top fixes to make your site faster.' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: SPEED_TEST_FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Website Speed Tester', item: PAGE_URL },
        ],
      },
    ],
  };
}

export default function WebsiteSpeedTesterPage() {
  return (
    <>
      <JsonLd data={schemaGraph()} />
      <SpeedTestClient />
    </>
  );
}
