import PrivacyPolicyPageClient from './PrivacyPolicyPageClient';

export const metadata = {
  title: 'Privacy Policy – Webhosting NZ | Data Protection & Rights',
  description: 'Read the Webhosting NZ Privacy Policy. Learn how we collect, use, store, and protect your personal data under the New Zealand Privacy Act 2020.',
  openGraph: {
    title: 'Privacy Policy – Webhosting NZ | Data Protection & Rights',
    description: 'Read the Webhosting NZ Privacy Policy. Learn how we collect, use, store, and protect your personal data under the New Zealand Privacy Act 2020.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy – Webhosting NZ | Data Protection & Rights',
    description: 'Read the Webhosting NZ Privacy Policy. Learn how we collect, use, store, and protect your personal data under the New Zealand Privacy Act 2020.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}
