import DomainPageClient from './DomainPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getCustomPricing } from '../lib/getCustomPricing';
import { applyDomainPriceOverride } from '../lib/buildDomainPriceOverride';
import rawPageHtml from '../data/domain_html.json';

export async function generateMetadata() {
  const seo = await getSeoMetadata('domain');
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

export default async function DomainPage() {
  const tlds = await getCustomPricing('domain_tld');
  const domainHtml = applyDomainPriceOverride(rawPageHtml as string, tlds);
  return <DomainPageClient domainHtml={domainHtml} />;
}
