'use client';

import { useState } from 'react';
import Link from 'next/link';
import BlogChrome from '../lib/BlogChrome';
import posts from '../data/blog_posts.json';

const PER_PAGE = 9;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default function BlogIndexClient() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const [page, setPage] = useState(1);

  const start = (page - 1) * PER_PAGE;
  const pagePosts = sorted.slice(start, start + PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BlogChrome>
      <div className="whnz-blog-index-wrap">
        <div className="whnz-blog-index-header">
          <h1 className="whnz-blog-index-title">
            <span className="accent">Web Hosting NZ</span>
            <span className="divider">|</span>
            <span className="rest">Blog</span>
          </h1>
          <p className="whnz-blog-index-sub">
            Expert hosting insights, digital marketing strategies, and business tips to keep your website fast and your brand growing in NZ.
          </p>
        </div>

        <div className="whnz-blog-grid">
          {pagePosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="whnz-blog-card">
              <div className="whnz-blog-card-imgwrap">
                {post.featured_image && (
                  <img
                    src={post.featured_image.url}
                    alt={post.featured_image.alt}
                    className="whnz-blog-card-img"
                  />
                )}
                {post.categories[0] && (
                  <span className="whnz-blog-card-cat">{post.categories[0]}</span>
                )}
              </div>
              <div className="whnz-blog-card-body">
                <div className="whnz-blog-card-date">{formatDate(post.date)}</div>
                <h2 className="whnz-blog-card-title">{post.title}</h2>
                <p className="whnz-blog-card-excerpt">
                  {stripHtml(post.excerpt_html).slice(0, 110)}...
                </p>
                <span className="whnz-blog-card-readmore">
                  Read Article
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="whnz-blog-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`whnz-blog-page-btn ${p === page ? 'active' : ''}`}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button
                type="button"
                className="whnz-blog-page-next"
                onClick={() => goToPage(page + 1)}
              >
                Next
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </BlogChrome>
  );
}
