import { getAllPosts } from '../lib/blogApi';
import BlogIndexClient from './BlogIndexClient';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog | Webhosting NZ',
  description: 'Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
