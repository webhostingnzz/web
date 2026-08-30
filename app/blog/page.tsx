import { getAllPosts } from '../lib/blogApi';
import BlogIndexClient from './BlogIndexClient';
import { getSeoMetadata } from '../lib/getSeoMetadata';

export const revalidate = 3600;

export async function generateMetadata() {
  const seo = await getSeoMetadata('blog');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.webp'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/wp-imported/webhosting.co.nz/uploads/2026/02/Untitled-design-78.webp'],
    },
  };
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
