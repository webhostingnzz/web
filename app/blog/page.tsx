import { getAllPosts } from '../lib/blogApi';
import BlogIndexClient from './BlogIndexClient';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog | Webhosting NZ',
  description: 'Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.',
  openGraph: {
    title: 'Blog | Webhosting NZ',
    description: 'Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Webhosting NZ',
    description: 'Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.',
    images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.png'],
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
