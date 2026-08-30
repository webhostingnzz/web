import AdminNav from './AdminNav';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f7fdfe', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AdminNav />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        {children}
      </main>
    </div>
  );
}
