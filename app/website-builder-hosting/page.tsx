import WebsiteBuilderHostingPageClient from './WebsiteBuilderHostingPageClient';

export const metadata = {
  title: 'Website Builder Hosting NZ | Easy Drag-and-Drop Site Builder',
  description: 'Build your website easily with our website builder hosting. Drag-and-drop tools, SEO features, free SSL, backups, CDN, and fast NZ hosting. Start today.',
  openGraph: {
    title: 'Website Builder Hosting NZ | Easy Drag-and-Drop Site Builder',
    description: 'Build your website easily with our website builder hosting. Drag-and-drop tools, SEO features, free SSL, backups, CDN, and fast NZ hosting. Start today.',
    images: ['/images/hero/website-builder-hosting-hero.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Builder Hosting NZ | Easy Drag-and-Drop Site Builder',
    description: 'Build your website easily with our website builder hosting. Drag-and-drop tools, SEO features, free SSL, backups, CDN, and fast NZ hosting. Start today.',
    images: ['/images/hero/website-builder-hosting-hero.webp'],
  },
};

export default function WebsiteBuilderHostingPage() {
  return <WebsiteBuilderHostingPageClient />;
}
