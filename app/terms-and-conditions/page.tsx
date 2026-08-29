import TermsAndConditionsPageClient from './TermsAndConditionsPageClient';

export const metadata = {
  title: 'Terms And Conditions – Webhosting NZ | Service Agreement',
  description: 'Read the Webhosting NZ Terms and Conditions covering service use, payments, refunds, AUP, data security, and legal obligations for all hosting and domain services.',
  openGraph: {
    title: 'Terms And Conditions – Webhosting NZ | Service Agreement',
    description: 'Read the Webhosting NZ Terms and Conditions covering service use, payments, refunds, AUP, data security, and legal obligations for all hosting and domain services.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms And Conditions – Webhosting NZ | Service Agreement',
    description: 'Read the Webhosting NZ Terms and Conditions covering service use, payments, refunds, AUP, data security, and legal obligations for all hosting and domain services.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsPageClient />;
}
