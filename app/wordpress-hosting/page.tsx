import WordpressHostingPageClient from './WordpressHostingPageClient';

export const metadata = {
  title: 'Managed WordPress Hosting NZ | Fast & Secure WP Hosting',
  description: 'Get fast, secure managed WordPress hosting in NZ with staging, cloning, SSD storage, backups, CDN, and 24/7 support. Choose your perfect WP hosting plan.',
  openGraph: {
    title: 'Managed WordPress Hosting NZ | Fast & Secure WP Hosting',
    description: 'Get fast, secure managed WordPress hosting in NZ with staging, cloning, SSD storage, backups, CDN, and 24/7 support. Choose your perfect WP hosting plan.',
    images: ['/images/hero/wordpress-hosting-hero.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Managed WordPress Hosting NZ | Fast & Secure WP Hosting',
    description: 'Get fast, secure managed WordPress hosting in NZ with staging, cloning, SSD storage, backups, CDN, and 24/7 support. Choose your perfect WP hosting plan.',
    images: ['/images/hero/wordpress-hosting-hero.webp'],
  },
};

export default function WordpressHostingPage() {
  return <WordpressHostingPageClient />;
}
