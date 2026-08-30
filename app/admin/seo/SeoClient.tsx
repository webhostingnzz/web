'use client';

import { useEffect, useState } from 'react';

type SeoPage = {
  slug: string;
  route: string;
  label: string;
  title: string;
  description: string;
  hasOverride: boolean;
};

export default function SeoClient() {
  const [pages, setPages] = useState<SeoPage[] | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    fetch('/api/admin/seo')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else { setPages(data.pages); setError(''); }
      })
      .catch(() => setError('Failed to load SEO settings.'));
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: SeoPage) => {
    setEditingSlug(p.slug);
    setDraftTitle(p.title);
    setDraftDescription(p.description);
  };

  const cancelEdit = () => setEditingSlug(null);

  const save = async (slug: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title: draftTitle, description: draftDescription }),
      });
      if (res.ok) {
        setEditingSlug(null);
        load();
      } else {
        setError('Failed to save.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: '#0b1220', margin: '0 0 8px' }}>
        SEO Settings
      </h1>
      <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 15, margin: '0 0 28px' }}>
        Edit each page's title and meta description shown in Google and social shares.
      </p>

      {error && <p style={{ color: '#e11d48' }}>{error}</p>}
      {!pages && !error && <p style={{ color: 'rgba(11,18,32,0.6)' }}>Loading…</p>}

      {pages && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pages.map((p) => (
            <div key={p.slug} style={{
              background: '#fff', border: '1px solid rgba(11,18,32,0.08)', borderRadius: 14,
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: editingSlug === p.slug ? 14 : 0 }}>
                <div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: '#0b1220' }}>
                    {p.label}
                  </span>
                  <span style={{ marginLeft: 10, fontSize: 12.5, color: 'rgba(11,18,32,0.4)' }}>{p.route}</span>
                  {p.hasOverride && (
                    <span style={{ marginLeft: 10, fontSize: 11, fontWeight: 700, color: '#0aa5c0', background: 'rgba(12,192,223,0.1)', padding: '2px 8px', borderRadius: 100 }}>
                      Edited
                    </span>
                  )}
                </div>
                {editingSlug !== p.slug && (
                  <button onClick={() => startEdit(p)} style={{
                    padding: '7px 16px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)',
                    background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>
                    Edit
                  </button>
                )}
              </div>

              {editingSlug !== p.slug ? (
                <div style={{ fontSize: 13.5 }}>
                  <p style={{ margin: '0 0 4px', color: '#0b1220', fontWeight: 600 }}>{p.title}</p>
                  <p style={{ margin: 0, color: 'rgba(11,18,32,0.6)' }}>{p.description}</p>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Title</label>
                  <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13.5, marginBottom: 12, boxSizing: 'border-box' }}
                  />
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'rgba(11,18,32,0.6)', marginBottom: 4 }}>Description</label>
                  <textarea
                    value={draftDescription}
                    onChange={(e) => setDraftDescription(e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)', fontSize: 13.5, marginBottom: 14, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => save(p.slug)} disabled={saving} style={{
                      padding: '8px 18px', borderRadius: 8, border: 'none', background: '#0CC0DF',
                      color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1,
                    }}>
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button onClick={cancelEdit} style={{
                      padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(11,18,32,0.15)',
                      background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
