import TermsAndConditionsPageClient from './TermsAndConditionsPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';

export async function generateMetadata() {
  const seo = await getSeoMetadata('terms-and-conditions');
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

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsPageClient />;
}
