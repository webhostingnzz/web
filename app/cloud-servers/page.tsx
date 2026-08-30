import CloudServersPageClient from './CloudServersPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';
import { getCustomPricing } from '../lib/getCustomPricing';
import { applyCloudServersOverride } from '../lib/buildCloudServersOverride';
import rawPageHtml from '../data/cloud_servers_html.json';

export async function generateMetadata() {
  const seo = await getSeoMetadata('cloud-servers');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/cloud-servers-hero.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/hero/cloud-servers-hero.webp'],
    },
  };
}

export default async function CloudServersPage() {
  const [webhostingNz, aws, gcp] = await Promise.all([
    getCustomPricing('cloud_servers_webhosting_nz'),
    getCustomPricing('cloud_servers_aws'),
    getCustomPricing('cloud_servers_gcp'),
  ]);
  const pageHtml = applyCloudServersOverride(rawPageHtml as string, {
    cloud_servers_webhosting_nz: webhostingNz,
    cloud_servers_aws: aws,
    cloud_servers_gcp: gcp,
  });
  return <CloudServersPageClient pageHtml={pageHtml} />;
}
