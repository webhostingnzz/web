import Link from 'next/link';

const cards = [
  { href: '/admin/orders', title: 'Web Design Orders', desc: 'View recent Stripe payments for Web Design Service packages.' },
  { href: '/admin/seo', title: 'SEO Settings', desc: 'Edit page titles and meta descriptions.' },
  { href: '/admin/pricing', title: 'Pricing & Plans', desc: 'Edit every price on the site — hosting, VPS, cloud, web design, and domains.' },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        Dashboard
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 32px' }}>
        Manage your site's orders, SEO, and pricing from here.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {cards.map((c) => (
          <Link key={c.href} href={c.href} style={{
            display: 'block', background: '#fff', border: '1px solid rgba(11,18,32,0.08)',
            borderRadius: 16, padding: '24px 20px', textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(11,18,32,0.04)',
          }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17, color: '#0b1220', margin: '0 0 8px' }}>
              {c.title}
            </h3>
            <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 13.5, margin: 0, lineHeight: 1.5 }}>
              {c.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
