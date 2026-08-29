import WebHostingPageClient from './WebHostingPageClient';

export const metadata = {
  title: 'Fast & Secure Web Hosting NZ | Affordable SSD Hosting Plans',
  description: 'Get fast, secure SSD web hosting in NZ with free SSL, backups, staging, CDN, and 24/7 support. Choose from affordable hosting plans built for NZ businesses.',
  openGraph: {
    title: 'Fast & Secure Web Hosting NZ | Affordable SSD Hosting Plans',
    description: 'Get fast, secure SSD web hosting in NZ with free SSL, backups, staging, CDN, and 24/7 support. Choose from affordable hosting plans built for NZ businesses.',
    images: ['/images/hero/web-hosting-hero.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast & Secure Web Hosting NZ | Affordable SSD Hosting Plans',
    description: 'Get fast, secure SSD web hosting in NZ with free SSL, backups, staging, CDN, and 24/7 support. Choose from affordable hosting plans built for NZ businesses.',
    images: ['/images/hero/web-hosting-hero.webp'],
  },
};

export default function WebHostingPage() {
  return <WebHostingPageClient />;
}
