import WordpressHostingPageClient from './WordpressHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';

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
  return <WordpressHostingPageClient pricingData={pricingData} />;
}
