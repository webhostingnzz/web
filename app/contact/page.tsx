import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: 'Contact Webhosting NZ | Fast Hosting Support & Assistance',
  description: 'Contact Webhosting NZ for fast, reliable hosting support. Reach our team for sales, technical help, billing, or general inquiries. We’re here to assist you 24/7.',
  openGraph: {
    title: 'Contact Webhosting NZ | Fast Hosting Support & Assistance',
    description: 'Contact Webhosting NZ for fast, reliable hosting support. Reach our team for sales, technical help, billing, or general inquiries. We’re here to assist you 24/7.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Webhosting NZ | Fast Hosting Support & Assistance',
    description: 'Contact Webhosting NZ for fast, reliable hosting support. Reach our team for sales, technical help, billing, or general inquiries. We’re here to assist you 24/7.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
