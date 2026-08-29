'use client';

import Link from 'next/link';
import BlogChrome from '../lib/BlogChrome';
import posts from '../data/blog_posts.json';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default function BlogIndexClient() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <BlogChrome>
      <div className="whnz-blog-index-wrap">
        <div className="whnz-blog-index-header">
          <h1 className="whnz-blog-index-title">Blog</h1>
          <p className="whnz-blog-index-sub">
            Guides and tips on web hosting, domains, SEO, and running an online business in New Zealand.
          </p>
        </div>

        <div className="whnz-blog-grid">
          {sorted.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="whnz-blog-card">
              {post.featured_image && (
                <img
                  src={post.featured_image.url}
                  alt={post.featured_image.alt}
                  className="whnz-blog-card-img"
                />
              )}
              <div className="whnz-blog-card-body">
                {post.categories[0] && (
                  <div className="whnz-blog-card-cat">{post.categories[0]}</div>
                )}
                <h2 className="whnz-blog-card-title">{post.title}</h2>
                <p className="whnz-blog-card-excerpt">
                  {stripHtml(post.excerpt_html).slice(0, 110)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BlogChrome>
  );
}
