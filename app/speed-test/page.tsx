import SpeedTestClient from './SpeedTestClient';
import JsonLd from '../components/JsonLd';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getBreadcrumbSchema } from '../lib/structuredData';
import { SPEED_TEST_FAQ } from './faq';

export async function generateMetadata() {
  const seo = await getSeoMetadata('speed-test');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/speed-test/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.webp'],
    },
  };
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NZ Website Speed Test',
  url: 'https://webhosting.co.nz/speed-test/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' },
  provider: { '@type': 'Organization', name: 'Webhosting NZ', url: 'https://webhosting.co.nz' },
  description: 'Free website speed test for New Zealand sites: Google PageSpeed scores, Core Web Vitals, hosting location and plain-English fixes.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SPEED_TEST_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SpeedTestPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Website Speed Test', path: '/speed-test/' },
      ])} />
      <SpeedTestClient />
    </>
  );
}
