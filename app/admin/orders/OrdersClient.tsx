'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  created: number;
  amount_total: number | null;
  currency: string;
  customer_email: string | null;
  customer_name: string | null;
  tier: string | null;
  company_name: string | null;
  contact_number: string | null;
  web_design_info: string | null;
};

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleString('en-NZ', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function formatAmount(cents: number | null, currency: string) {
  if (cents === null) return '—';
  return `${currency.toUpperCase()} $${(cents / 100).toFixed(2)}`;
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setOrders(data.orders);
      })
      .catch(() => setError('Failed to load orders.'));
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        Web Design Orders
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 28px' }}>
        Live from Stripe — most recent 50 completed orders.
      </p>

      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {!orders && !error && <p style={{ color: 'rgba(11,18,32,0.6)' }}>Loading…</p>}
      {orders && orders.length === 0 && <p style={{ color: 'rgba(11,18,32,0.6)' }}>No orders yet.</p>}

      {orders && orders.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(11,18,32,0.08)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead>
                <tr style={{ background: '#f7fdfe', textAlign: 'left' }}>
                  {['Date', 'Tier', 'Amount', 'Customer', 'Company', 'Contact', 'Design Notes'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'rgba(11,18,32,0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderTop: '1px solid rgba(11,18,32,0.06)' }}>
                    <td style={{ padding: '14px 16px', fontSize: 13.5, whiteSpace: 'nowrap' }}>{formatDate(o.created)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5, textTransform: 'capitalize' }}>{o.tier || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5, fontWeight: 700, color: '#0CC0DF' }}>{formatAmount(o.amount_total, o.currency)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5 }}>
                      {o.customer_name || '—'}<br />
                      <span style={{ color: 'rgba(11,18,32,0.5)' }}>{o.customer_email || ''}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5 }}>{o.company_name || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5 }}>{o.contact_number || '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13.5, maxWidth: 240 }}>{o.web_design_info || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
