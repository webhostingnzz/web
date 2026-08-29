'use client';

import Link from 'next/link';
import BlogChrome from '../lib/BlogChrome';

type Post = {
  slug: string;
  title: string;
  seo_title: string;
  seo_description: string;
  date: string;
  content_html: string;
  featured_image: { url: string; alt: string; width?: number; height?: number } | null;
  categories: string[];
  tags: string[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostClient({ post }: { post: Post }) {
  return (
    <BlogChrome>
      <article className="whnz-blog-wrap">
        <nav className="whnz-blog-breadcrumb">
          <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.title}
        </nav>

        {post.categories.length > 0 && (
          <div className="whnz-blog-categories">
            {post.categories.map((c) => (
              <span key={c} className="whnz-blog-category-tag">{c}</span>
            ))}
          </div>
        )}

        <h1 className="whnz-blog-title">{post.title}</h1>

        <div className="whnz-blog-meta">
          <span>{formatDate(post.date)}</span>
        </div>

        {post.featured_image && (
          <img
            src={post.featured_image.url}
            alt={post.featured_image.alt}
            className="whnz-blog-featured-img"
          />
        )}

        <div
          className="whnz-blog-content"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        {post.tags.length > 0 && (
          <div className="whnz-blog-tags">
            {post.tags.map((t) => (
              <span key={t} className="whnz-blog-tag">{t}</span>
            ))}
          </div>
        )}
      </article>
    </BlogChrome>
  );
}
