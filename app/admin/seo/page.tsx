import SeoClient from './SeoClient';

export const metadata = { robots: { index: false, follow: false } };

export default function AdminSeoPage() {
  return <SeoClient />;
}
