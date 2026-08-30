import VpsHostingPageClient from './VpsHostingPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getCustomPricing } from '../lib/getCustomPricing';

export async function generateMetadata() {
  const seo = await getSeoMetadata('vps-hosting');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/vps-hosting-hero.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/vps-hosting-hero.webp'],
    },
  };
}

export default async function VpsHostingPage() {
  const vpsTiers = await getCustomPricing('vps');
  return <VpsHostingPageClient vpsTiers={vpsTiers} />;
}
