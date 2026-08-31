import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Webhosting NZ',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #e8fbfd 0%, #ffffff 60%)',
      fontFamily: "'Outfit', sans-serif", padding: '40px 20px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 520 }}>
        <img
          src="/images/loader-icon.webp"
          alt="Webhosting NZ"
          width={90}
          style={{ display: 'block', margin: '0 auto 32px', height: 'auto' }}
        />

        <div style={{
          fontSize: 'clamp(64px, 12vw, 120px)', fontWeight: 800, lineHeight: 1,
          color: '#0CC0DF', letterSpacing: '-0.03em', marginBottom: 8,
        }}>
          404
        </div>

        <h1 style={{
          fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, color: '#0b1220',
          margin: '0 0 14px',
        }}>
          This page doesn't exist
        </h1>

        <p style={{
          color: 'rgba(11,18,32,0.6)', fontSize: 16, lineHeight: 1.6, margin: '0 0 36px',
        }}>
          The page you're looking for may have been moved, renamed, or never existed.
          Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <Link href="/" style={{
            padding: '14px 28px', borderRadius: 10, background: '#0CC0DF', color: '#fff',
            fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-flex',
            alignItems: 'center', boxShadow: '0 4px 14px rgba(12,192,223,.25)',
          }}>
            Back to Homepage
          </Link>
          <Link href="/contact" style={{
            padding: '14px 28px', borderRadius: 10, background: '#fff', color: '#0b1220',
            fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-flex',
            alignItems: 'center', border: '1px solid rgba(11,18,32,0.12)',
          }}>
            Contact Us
          </Link>
        </div>

        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          fontSize: 13.5, fontWeight: 600,
        }}>
          <Link href="/web-hosting" style={{ color: 'rgba(11,18,32,0.55)', textDecoration: 'none' }}>Web Hosting</Link>
          <Link href="/wordpress-hosting" style={{ color: 'rgba(11,18,32,0.55)', textDecoration: 'none' }}>WordPress Hosting</Link>
          <Link href="/domain" style={{ color: 'rgba(11,18,32,0.55)', textDecoration: 'none' }}>Domains</Link>
          <Link href="/blog" style={{ color: 'rgba(11,18,32,0.55)', textDecoration: 'none' }}>Blog</Link>
        </div>
      </div>
    </div>
  );
}
