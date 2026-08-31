'use client';

import { useEffect, useState } from 'react';

type Item = {
  id: string;
  category: string;
  item_name: string;
  price: number;
  original_price: number | null;
  specs: Record<string, any>;
  order_link: string | null;
  display_order: number;
};

const CATEGORY_LABELS: Record<string, string> = {
  vps: 'VPS Hosting',
  cloud_servers_webhosting_nz: 'Cloud Servers — Webhosting NZ',
  cloud_servers_aws: 'Cloud Servers — AWS',
  cloud_servers_gcp: 'Cloud Servers — GCP',
  web_design: 'Web Design',
  domain_tld: 'Domain Pricing',
};

export default function CustomPricingAdminClient() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ item_name: string; price: string; original_price: string; specs: string; order_link: string }>({
    item_name: '', price: '', original_price: '', specs: '', order_link: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/admin/custom-pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else { setItems(data.items); setError(''); }
      })
      .catch(() => setError('Failed to load pricing items.'));
  };

  useEffect(() => { load(); }, []);

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setDraft({
      item_name: item.item_name,
      price: String(item.price),
      original_price: item.original_price === null ? '' : String(item.original_price),
      specs: JSON.stringify(item.specs || {}, null, 2),
      order_link: item.order_link || '',
    });
  };

  const cancelEdit = () => setEditingId(null);

  const save = async (id: string) => {
    setSaving(true);
    setError('');
    try {
      let parsedSpecs: Record<string, any>;
      try {
        parsedSpecs = JSON.parse(draft.specs);
      } catch {
        setError('Specs must be valid JSON — check for a missing comma or quote.');
        setSaving(false);
        return;
      }

      const res = await fetch('/api/admin/custom-pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          item_name: draft.item_name,
          price: parseFloat(draft.price),
          original_price: draft.original_price === '' ? null : parseFloat(draft.original_price),
          specs: parsedSpecs,
          order_link: draft.order_link,
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

  const grouped = items?.reduce((acc: Record<string, Item[]>, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        VPS, Cloud, Web Design & Domain Pricing
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 8px' }}>
        Edit VPS tiers, cloud server plans (all 3 providers), Web Design packages, and domain TLD prices.
      </p>
      <p style={{ color: 'rgba(11,18,32,0.5)', fontSize: 13, margin: '0 0 20px' }}>
        Note: VPS, cloud server, and domain prices can also be kept in sync automatically from WHMCS using the "Sync Prices from WHMCS" button on the Pricing &amp; Plans page — this page is for manual edits, or for Web Design (which isn't auto-synced).
      </p>

      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {!items && !error && <p style={{ color: 'rgba(11,18,32,0.6)' }}>Loading…</p>}

      {grouped && Object.entries(grouped).map(([category, catItems]) => (
        <div key={category} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17, color: '#0b1220', margin: '0 0 12px' }}>
            {CATEGORY_LABELS[category] || category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {catItems.map((item) => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid rgba(11,18,32,0.08)', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingId === item.id ? 14 : 0 }}>
                  <div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14.5, color: '#0b1220' }}>{item.item_name}</span>
                    <span style={{ marginLeft: 10, fontSize: 13.5, fontWeight: 700, color: '#0CC0DF' }}>
                      NZ${Number(item.price).toFixed(2)}
                      {item.original_price ? (
                        <span style={{ marginLeft: 6, color: 'rgba(11,18,32,0.4)', textDecoration: 'line-through', fontWeight: 600 }}>
                          NZ${Number(item.original_price).toFixed(2)}
                        </span>
                      ) : null}
                    </span>
                  </div>
                  {editingId !== item.id && (
                    <button onClick={() => startEdit(item)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', background: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                      Edit
                    </button>
                  )}
                </div>

                {editingId === item.id && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 130px', gap: 12, marginBottom: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Item Name</label>
                        <input value={draft.item_name} onChange={(e) => setDraft({ ...draft, item_name: e.target.value })}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Price (NZ$)</label>
                        <input value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} type="number" step="0.01"
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Was (NZ$, optional)</label>
                        <input value={draft.original_price} onChange={(e) => setDraft({ ...draft, original_price: e.target.value })} type="number" step="0.01" placeholder="—"
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>
                      Specs (JSON — e.g. cpu/ram/storage/bandwidth, or description for Web Design)
                    </label>
                    <textarea value={draft.specs} onChange={(e) => setDraft({ ...draft, specs: e.target.value })} rows={5}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 12.5, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'monospace', resize: 'vertical' }} />
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Order Link (WHMCS URL, optional)</label>
                    <input value={draft.order_link} onChange={(e) => setDraft({ ...draft, order_link: e.target.value })} placeholder="—"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13, marginBottom: 14, boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => save(item.id)} disabled={saving} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0CC0DF', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
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
