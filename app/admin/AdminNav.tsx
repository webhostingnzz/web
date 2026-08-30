'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Web Design Orders' },
  { href: '/admin/seo', label: 'SEO' },
  { href: '/admin/pricing', label: 'Pricing' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  // The login page shares this same layout (it's nested under /admin), but
  // showing the nav bar there — before you're even authenticated — doesn't
  // make sense, so skip rendering entirely on that one route.
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return null;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid rgba(11,18,32,0.08)',
      padding: '0 24px', display: 'flex', alignItems: 'center', gap: 4,
      overflowX: 'auto',
    }}>
      <div style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16,
        color: '#0b1220', padding: '18px 20px 18px 0', flexShrink: 0,
      }}>
        Admin
      </div>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: '18px 16px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              color: active ? '#0CC0DF' : 'rgba(11,18,32,0.6)',
              borderBottom: active ? '2px solid #0CC0DF' : '2px solid transparent',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            {link.label}
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        style={{
          marginLeft: 'auto', padding: '8px 16px', border: '1px solid rgba(11,18,32,0.15)',
          borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 600,
          color: 'rgba(11,18,32,0.7)', cursor: 'pointer', flexShrink: 0,
        }}
      >
        Log out
      </button>
    </nav>
  );
}
