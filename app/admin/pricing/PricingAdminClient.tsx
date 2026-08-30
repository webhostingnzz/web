'use client';

import { useEffect, useState } from 'react';

type Plan = {
  id: string;
  page: string;
  plan_name: string;
  monthly_price: number;
  features: string[];
  order_link: string;
  image_url: string;
  display_order: number;
};

const PAGE_LABELS: Record<string, string> = {
  web_hosting: 'Web Hosting',
  wordpress_hosting: 'WordPress Hosting',
  website_builder_hosting: 'Website Builder',
};

export default function PricingAdminClient() {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ plan_name: string; monthly_price: string; features: string; order_link: string; image_url: string }>({
    plan_name: '', monthly_price: '', features: '', order_link: '', image_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);

  const syncFromWhmcs = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/admin/sync-whmcs', { method: 'POST' });
      const data = await res.json();
      setSyncResult(data);
      if (!data.error) load();
    } catch {
      setSyncResult({ error: 'Failed to reach the sync endpoint.' });
    } finally {
      setSyncing(false);
    }
  };

  const load = () => {
    fetch('/api/admin/pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else { setPlans(data.plans); setError(''); }
      })
      .catch(() => setError('Failed to load pricing plans.'));
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: Plan) => {
    setEditingId(p.id);
    setDraft({
      plan_name: p.plan_name,
      monthly_price: String(p.monthly_price),
      features: (p.features || []).join('\n'),
      order_link: p.order_link,
      image_url: p.image_url,
    });
  };

  const cancelEdit = () => setEditingId(null);

  const save = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          plan_name: draft.plan_name,
          monthly_price: parseFloat(draft.monthly_price),
          features: draft.features.split('\n').map((f) => f.trim()).filter(Boolean),
          order_link: draft.order_link,
          image_url: draft.image_url,
        }),
      });
      if (res.ok) {
        setEditingId(null);
        load();
      } else {
        setError('Failed to save.');
      }
    } finally {
      setSaving(false);
    }
  };

  const grouped = plans?.reduce((acc: Record<string, Plan[]>, p) => {
    (acc[p.page] = acc[p.page] || []).push(p);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        Pricing & Plans
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 20px' }}>
        Edit prices and features shown on the hosting pages. Changes appear on the site within a minute or two.
      </p>

      <button onClick={syncFromWhmcs} disabled={syncing} style={{
        padding: '10px 20px', borderRadius: 10, border: 'none', background: '#0b1220',
        color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: syncing ? 'default' : 'pointer',
        opacity: syncing ? 0.7 : 1, marginBottom: 20,
      }}>
        {syncing ? 'Syncing…' : 'Sync Prices from WHMCS'}
      </button>

      {syncResult && (
        <div style={{ background: '#fff', border: '1px solid rgba(11,18,32,0.08)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, fontSize: 13 }}>
          {syncResult.error ? (
            <p style={{ color: '#e11d48', margin: 0 }}>{syncResult.error}</p>
          ) : (
            <>
              <p style={{ fontWeight: 700, margin: '0 0 8px', color: '#0b1220' }}>
                Updated {syncResult.pricingPlansUpdated.length + syncResult.customItemsUpdated.length + syncResult.domainsUpdated.length} item(s)
              </p>
              {[...syncResult.pricingPlansUpdated, ...syncResult.customItemsUpdated, ...syncResult.domainsUpdated].map((line: string, i: number) => (
                <div key={i} style={{ color: 'rgba(11,18,32,0.7)' }}>{line}</div>
              ))}
              {syncResult.unmatchedWhmcsProducts?.length > 0 && (
                <details style={{ marginTop: 10 }}>
                  <summary style={{ cursor: 'pointer', color: 'rgba(11,18,32,0.5)' }}>
                    {syncResult.unmatchedWhmcsProducts.length} WHMCS product(s) didn't match anything on the site
                  </summary>
                  <div style={{ marginTop: 6, color: 'rgba(11,18,32,0.5)' }}>
                    {syncResult.unmatchedWhmcsProducts.join(', ')}
                  </div>
                </details>
              )}
              {syncResult.errors?.length > 0 && (
                <div style={{ color: '#e11d48', marginTop: 10 }}>{syncResult.errors.join(' | ')}</div>
              )}
            </>
          )}
        </div>
      )}

      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {!plans && !error && <p style={{ color: 'rgba(11,18,32,0.6)' }}>Loading…</p>}

      {grouped && Object.entries(grouped).map(([page, pagePlans]) => (
        <div key={page} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17, color: '#0b1220', margin: '0 0 12px' }}>
            {PAGE_LABELS[page] || page}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pagePlans.map((p) => (
              <div key={p.id} style={{ background: '#fff', border: '1px solid rgba(11,18,32,0.08)', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingId === p.id ? 14 : 0 }}>
                  <div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14.5, color: '#0b1220' }}>{p.plan_name}</span>
                    <span style={{ marginLeft: 10, fontSize: 13.5, fontWeight: 700, color: '#0CC0DF' }}>NZ${Number(p.monthly_price).toFixed(2)}/mo</span>
                  </div>
                  {editingId !== p.id && (
                    <button onClick={() => startEdit(p)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', background: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                      Edit
                    </button>
                  )}
                </div>

                {editingId === p.id && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12, marginBottom: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Plan Name</label>
                        <input value={draft.plan_name} onChange={(e) => setDraft({ ...draft, plan_name: e.target.value })}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Monthly Price (NZ$)</label>
                        <input value={draft.monthly_price} onChange={(e) => setDraft({ ...draft, monthly_price: e.target.value })} type="number" step="0.01"
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Features (one per line)</label>
                    <textarea value={draft.features} onChange={(e) => setDraft({ ...draft, features: e.target.value })} rows={6}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Order Link (WHMCS URL)</label>
                    <input value={draft.order_link} onChange={(e) => setDraft({ ...draft, order_link: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, marginBottom: 12, boxSizing: 'border-box' }} />
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Illustration Image URL</label>
                    <input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, marginBottom: 14, boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => save(p.id)} disabled={saving} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0CC0DF', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                        {saving ? 'Saving…' : 'Save'}
                      </button>
                      <button onClick={cancelEdit} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
