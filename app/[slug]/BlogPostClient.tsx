'use client';

import { useState } from 'react';
import Link from 'next/link';
import BlogChrome from '../lib/BlogChrome';

type TocItem = { id: string; text: string; level: string };

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
  toc?: TocItem[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [expanded, setExpanded] = useState(true);
  const VISIBLE_COUNT = 8;
  const visible = expanded ? toc : toc.slice(0, VISIBLE_COUNT);
  const hasMore = toc.length > VISIBLE_COUNT;

  return (
    <div className="whnz-blog-toc">
      <div className="whnz-blog-toc-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
        Table of Contents
      </div>
      <ul className="whnz-blog-toc-list">
        {visible.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          className="whnz-blog-toc-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
          <svg
            viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
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

        {post.toc && post.toc.length > 1 && <TableOfContents toc={post.toc} />}

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
