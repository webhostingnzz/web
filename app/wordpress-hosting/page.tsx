import WordpressHostingPageClient from './WordpressHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';
import JsonLd from '../components/JsonLd';
import { getProductSchema, getBreadcrumbSchema } from '../lib/structuredData';

export async function generateMetadata() {
  const seo = await getSeoMetadata('wordpress-hosting');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/wordpress-hosting-hero.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/wordpress-hosting-hero.webp'],
    },
  };
}

export default async function WordpressHostingPage() {
  const pricingData = await getPricingPageData('wordpress_hosting');
  return (
    <>
      <JsonLd data={getProductSchema(pricingData.plans, '/wordpress-hosting')} />
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'WordPress Hosting', path: '/wordpress-hosting' },
      ])} />
      <WordpressHostingPageClient pricingData={pricingData} />
    </>
  );
}
