import HomePageClient from './_homeclient/HomePageClient';

export const metadata = {
  title: 'Cheapest Web Hosting In New Zealand | Just 4.49 NZD | Fast & Secure Hosting Plans',
  description: 'Get fast, secure managed web hosting in NZ. High-speed servers, CDN, backups, and 24/7 support for WordPress, cloud, and VPS hosting. Choose your plan today.',
  openGraph: {
    title: 'Cheapest Web Hosting In New Zealand | Just 4.49 NZD | Fast & Secure Hosting Plans',
    description: 'Get fast, secure managed web hosting in NZ. High-speed servers, CDN, backups, and 24/7 support for WordPress, cloud, and VPS hosting. Choose your plan today.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheapest Web Hosting In New Zealand | Just 4.49 NZD | Fast & Secure Hosting Plans',
    description: 'Get fast, secure managed web hosting in NZ. High-speed servers, CDN, backups, and 24/7 support for WordPress, cloud, and VPS hosting. Choose your plan today.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function Home() {
  return <HomePageClient />;
}
