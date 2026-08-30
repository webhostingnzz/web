'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Incorrect username or password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f7fdfe', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 20,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff', borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 380,
        boxShadow: '0 20px 60px rgba(11,18,32,0.08)', border: '1px solid rgba(11,18,32,0.06)',
      }}>
        <img
          src="/images/logo.webp"
          alt="Webhosting NZ"
          width={150}
          style={{ display: 'block', margin: '0 auto 24px', height: 'auto' }}
        />
        <h1 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: '#0b1220',
          margin: '0 0 8px', textAlign: 'center',
        }}>
          Admin Login
        </h1>
        <p style={{ color: 'rgba(11,18,32,0.6)', fontSize: 14, margin: '0 0 28px', textAlign: 'center' }}>
          Sign in to manage the site.
        </p>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0b1220', marginBottom: 6 }}>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          autoComplete="username"
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(11,18,32,0.15)',
            fontSize: 15, marginBottom: 16, boxSizing: 'border-box',
          }}
        />
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0b1220', marginBottom: 6 }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(11,18,32,0.15)',
            fontSize: 15, marginBottom: 16, boxSizing: 'border-box',
          }}
        />
        {error && (
          <p style={{ color: '#e11d48', fontSize: 13, margin: '0 0 16px' }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '13px 10px', borderRadius: 10, border: 'none',
            background: '#0CC0DF', color: '#fff', fontFamily: "'Outfit', sans-serif",
            fontWeight: 700, fontSize: 14, cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
