import CloudServersPageClient from './CloudServersPageClient';

export const metadata = {
  title: 'Managed Cloud Servers NZ | Fast Scalable Multi-Platform Hosting',
  description: 'Get lightning-fast managed cloud servers in NZ with SSD storage, global data centres, scaling, security, and full control. Deploy your apps with top performance.',
  openGraph: {
    title: 'Managed Cloud Servers NZ | Fast Scalable Multi-Platform Hosting',
    description: 'Get lightning-fast managed cloud servers in NZ with SSD storage, global data centres, scaling, security, and full control. Deploy your apps with top performance.',
    images: ['/images/hero/cloud-servers-hero.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Managed Cloud Servers NZ | Fast Scalable Multi-Platform Hosting',
    description: 'Get lightning-fast managed cloud servers in NZ with SSD storage, global data centres, scaling, security, and full control. Deploy your apps with top performance.',
    images: ['/images/hero/cloud-servers-hero.webp'],
  },
};

export default function CloudServersPage() {
  return <CloudServersPageClient />;
}
