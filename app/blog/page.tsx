import BlogIndexClient from './BlogIndexClient';

export const metadata = {
  title: 'Blog | Webhosting NZ',
  description: 'Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.',
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}
