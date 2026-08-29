import AboutPageClient from './AboutPageClient';

export const metadata = {
  title: 'About Webhosting NZ | Trusted Web Hosting Company In NZ',
  description: 'Learn about Webhosting NZ—your trusted New Zealand web hosting company delivering fast, secure, and reliable hosting with global infrastructure and expert support.',
  openGraph: {
    title: 'About Webhosting NZ | Trusted Web Hosting Company In NZ',
    description: 'Learn about Webhosting NZ—your trusted New Zealand web hosting company delivering fast, secure, and reliable hosting with global infrastructure and expert support.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Webhosting NZ | Trusted Web Hosting Company In NZ',
    description: 'Learn about Webhosting NZ—your trusted New Zealand web hosting company delivering fast, secure, and reliable hosting with global infrastructure and expert support.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
