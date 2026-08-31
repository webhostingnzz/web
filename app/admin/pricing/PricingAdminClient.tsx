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

type CustomItem = {
  id: string;
  category: string;
  item_name: string;
  price: number;
  original_price: number | null;
  specs: Record<string, any>;
  order_link: string | null;
  display_order: number;
};

const PAGE_LABELS: Record<string, string> = {
  web_hosting: 'Web Hosting',
  wordpress_hosting: 'WordPress Hosting',
  website_builder_hosting: 'Website Builder',
};

const CATEGORY_LABELS: Record<string, string> = {
  vps: 'VPS Hosting',
  cloud_servers_webhosting_nz: 'Cloud Servers — Webhosting NZ',
  cloud_servers_aws: 'Cloud Servers — AWS',
  cloud_servers_gcp: 'Cloud Servers — GCP',
  web_design: 'Web Design',
  domain_tld: 'Domain Pricing',
};

export default function PricingAdminClient() {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [items, setItems] = useState<CustomItem[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<'plan' | 'item' | null>(null);
  const [draft, setDraft] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    Promise.all([
      fetch('/api/admin/pricing').then((res) => res.json()),
      fetch('/api/admin/custom-pricing').then((res) => res.json()),
    ])
      .then(([plansData, itemsData]) => {
        if (plansData.error) setError(plansData.error);
        else setPlans(plansData.plans);
        if (itemsData.error) setError((e) => e || itemsData.error);
        else setItems(itemsData.items);
        if (!plansData.error && !itemsData.error) setError('');
      })
      .catch(() => setError('Failed to load pricing data.'));
  };

  useEffect(() => { load(); }, []);

  const startEditPlan = (p: Plan) => {
    setEditingId(p.id);
    setEditingType('plan');
    setDraft({
      plan_name: p.plan_name,
      monthly_price: String(p.monthly_price),
      features: (p.features || []).join('\n'),
      order_link: p.order_link,
      image_url: p.image_url,
    });
  };

  const startEditItem = (item: CustomItem) => {
    setEditingId(item.id);
    setEditingType('item');
    setDraft({
      item_name: item.item_name,
      price: String(item.price),
      original_price: item.original_price === null ? '' : String(item.original_price),
      specs: JSON.stringify(item.specs || {}, null, 2),
      order_link: item.order_link || '',
    });
  };

  const cancelEdit = () => { setEditingId(null); setEditingType(null); };

  const savePlan = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          plan_name: draft.plan_name,
          monthly_price: parseFloat(draft.monthly_price),
          features: draft.features.split('\n').map((f: string) => f.trim()).filter(Boolean),
          order_link: draft.order_link,
          image_url: draft.image_url,
        }),
      });
      if (res.ok) { cancelEdit(); load(); } else setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const saveItem = async (id: string) => {
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
      if (res.ok) { cancelEdit(); load(); } else setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const groupedPlans = plans?.reduce((acc: Record<string, Plan[]>, p) => {
    (acc[p.page] = acc[p.page] || []).push(p);
    return acc;
  }, {});

  const groupedItems = items?.reduce((acc: Record<string, CustomItem[]>, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        Pricing & Plans
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 24px' }}>
        Edit every price on the site — hosting plans, VPS, cloud servers, web design, and domains — all in one place. Changes appear on the site within a minute or two.
      </p>

      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {(!plans || !items) && !error && <p style={{ color: 'rgba(11,18,32,0.6)' }}>Loading…</p>}

      {/* --- Named hosting plans (Web Hosting / WordPress / Website Builder) --- */}
      {groupedPlans && Object.entries(groupedPlans).map(([page, pagePlans]) => (
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
                    <button onClick={() => startEditPlan(p)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', background: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                      Edit
                    </button>
                  )}
                </div>

                {editingId === p.id && editingType === 'plan' && (
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
                      <button onClick={() => savePlan(p.id)} disabled={saving} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0CC0DF', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
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

      {/* --- VPS, Cloud Servers, Web Design, Domains --- */}
      {groupedItems && Object.entries(groupedItems).map(([category, catItems]) => (
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
                    <button onClick={() => startEditItem(item)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', background: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                      Edit
                    </button>
                  )}
                </div>

                {editingId === item.id && editingType === 'item' && (
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
                      <button onClick={() => saveItem(item.id)} disabled={saving} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0CC0DF', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
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
