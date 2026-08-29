'use client';

import Link from 'next/link';
import BlogChrome from '../../lib/BlogChrome';

export default function SuccessClient() {
  return (
    <BlogChrome>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '160px 20px 100px', textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'rgba(12,192,223,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
        }}>
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0CC0DF" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 32, color: '#0b1220', marginBottom: 16 }}>
          Order Confirmed
        </h1>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 17, color: 'rgba(11,18,32,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
          Thanks for your order! We've received your payment and will be in touch shortly to get started on your new website.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block', background: '#0CC0DF', color: '#fff', textDecoration: 'none',
            padding: '15px 34px', borderRadius: 10, fontWeight: 700, fontSize: 13,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}
        >
          Back to Home
        </Link>
      </div>
    </BlogChrome>
  );
}
