import WebsiteBuilderHostingPageClient from './WebsiteBuilderHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getPricingPageData } from '../lib/getPricingPlans';
import JsonLd from '../components/JsonLd';
import { getProductSchema, getBreadcrumbSchema } from '../lib/structuredData';

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
  return (
    <>
      <JsonLd data={getProductSchema(pricingData.plans, '/website-builder-hosting')} />
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Website Builder Hosting', path: '/website-builder-hosting' },
      ])} />
      <WebsiteBuilderHostingPageClient pricingData={pricingData} />
    </>
  );
}
