import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../lib/blogApi';
import BlogPostClient from './BlogPostClient';
import JsonLd from '../components/JsonLd';
import { getArticleSchema, getBreadcrumbSchema } from '../lib/structuredData';

// Re-check WordPress for new/edited posts periodically without a redeploy.
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo_title,
    description: post.seo_description,
    openGraph: {
      title: post.seo_title,
      description: post.seo_description,
      images: post.featured_image ? [post.featured_image.url] : undefined,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title,
      description: post.seo_description,
      images: post.featured_image ? [post.featured_image.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={getArticleSchema(post)} />
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/${post.slug}` },
      ])} />
      <BlogPostClient post={post} />
    </>
  );
}
