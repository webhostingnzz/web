import ContactPageClient from './ContactPageClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';

export async function generateMetadata() {
  const seo = await getSeoMetadata('contact');
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

export default function ContactPage() {
  return <ContactPageClient />;
}
