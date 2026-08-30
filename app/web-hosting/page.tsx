import WebHostingPageClient from './WebHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';

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
  return <WebHostingPageClient pricingData={pricingData} />;
}
