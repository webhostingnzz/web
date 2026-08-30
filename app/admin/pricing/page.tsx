import PricingAdminClient from './PricingAdminClient';

export const metadata = { robots: { index: false, follow: false } };

export default function AdminPricingPage() {
  return <PricingAdminClient />;
}
