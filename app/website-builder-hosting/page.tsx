import WebsiteBuilderHostingPageClient from './WebsiteBuilderHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';

export async function generateMetadata() {
  const seo = await getSeoMetadata('website-builder-hosting');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/website-builder-hosting-hero.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/website-builder-hosting-hero.webp'],
    },
  };
}

export default async function WebsiteBuilderHostingPage() {
  const pricingData = await getPricingPageData('website_builder_hosting');
  return <WebsiteBuilderHostingPageClient pricingData={pricingData} />;
}
