import WebDesignServicePageClient from './WebDesignServicePageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getCustomPricing } from '../lib/getCustomPricing';
import { applyWebDesignPriceOverride } from '../lib/buildWebDesignPriceOverride';
import rawPageHtml from '../data/web_design_service_html.json';

export async function generateMetadata() {
  const seo = await getSeoMetadata('web-design-service');
  return {
    title: seo.title,
    description: seo.description,
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

export default async function WebDesignServicePage() {
  const tiers = await getCustomPricing('web_design');
  const pageHtml = applyWebDesignPriceOverride(rawPageHtml as string, tiers);
  return <WebDesignServicePageClient pageHtml={pageHtml} />;
}
