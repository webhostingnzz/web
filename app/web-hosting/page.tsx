import WebHostingPageClient from './WebHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';
import JsonLd from '../components/JsonLd';
import { getProductSchema, getBreadcrumbSchema } from '../lib/structuredData';

export async function generateMetadata() {
  const seo = await getSeoMetadata('web-hosting');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/web-hosting-hero.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/web-hosting-hero.webp'],
    },
  };
}

export default async function WebHostingPage() {
  const pricingData = await getPricingPageData('web_hosting');
  return (
    <>
      <JsonLd data={getProductSchema(pricingData.plans, '/web-hosting')} />
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Web Hosting', path: '/web-hosting' },
      ])} />
      <WebHostingPageClient pricingData={pricingData} />
    </>
  );
}
