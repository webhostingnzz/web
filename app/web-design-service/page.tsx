import WebDesignServicePageClient from './WebDesignServicePageClient';

export const metadata = {
  title: 'Affordable Web Design Service | With 1 Year Free Hosting',
  description: 'We provide modern and clean web design service for affordable prices for businesses in New Zealand with free hosting included.',
  openGraph: {
    title: 'Affordable Web Design Service | With 1 Year Free Hosting',
    description: 'We provide modern and clean web design service for affordable prices for businesses in New Zealand with free hosting included.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Web Design Service | With 1 Year Free Hosting',
    description: 'We provide modern and clean web design service for affordable prices for businesses in New Zealand with free hosting included.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function WebDesignServicePage() {
  return <WebDesignServicePageClient />;
}
