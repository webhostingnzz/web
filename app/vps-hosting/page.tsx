import VpsHostingPageClient from './VpsHostingPageClient';

export const metadata = {
  title: 'High-Performance VPS Hosting NZ | Fast SSD Virtual Servers',
  description: 'Get lightning-fast SSD VPS hosting in NZ with instant deployment, unlimited bandwidth, anti-DDoS protection, and full root access. Choose your VPS plan today.',
  openGraph: {
    title: 'High-Performance VPS Hosting NZ | Fast SSD Virtual Servers',
    description: 'Get lightning-fast SSD VPS hosting in NZ with instant deployment, unlimited bandwidth, anti-DDoS protection, and full root access. Choose your VPS plan today.',
    images: ['/images/hero/vps-hosting-hero.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Performance VPS Hosting NZ | Fast SSD Virtual Servers',
    description: 'Get lightning-fast SSD VPS hosting in NZ with instant deployment, unlimited bandwidth, anti-DDoS protection, and full root access. Choose your VPS plan today.',
    images: ['/images/hero/vps-hosting-hero.webp'],
  },
};

export default function VpsHostingPage() {
  return <VpsHostingPageClient />;
}
