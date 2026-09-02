'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

type Message = {
  id: string;
  sender: 'visitor' | 'ai' | 'agent';
  content: string;
  created_at: string;
};

const SESSION_STORAGE_KEY = 'whnz_chat_session_id';

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mode, setMode] = useState<'ai' | 'handoff'>('ai');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [handingOff, setHandingOff] = useState(false);
  const lastPolledAt = useRef<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Restore an existing session on load, if there is one, so a page
  // refresh doesn't lose an in-progress conversation.
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(SESSION_STORAGE_KEY) : null;
    if (stored) setSessionId(stored);
  }, []);

  useEffect(() => {
    if (sessionId) localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll for new messages every 3 seconds while in handoff mode (this is
  // what picks up the agent's WhatsApp replies).
  useEffect(() => {
    if (mode !== 'handoff' || !sessionId || !open) return;

    const poll = async () => {
      try {
        const params = new URLSearchParams({ sessionId });
        if (lastPolledAt.current) params.set('since', lastPolledAt.current);
        const res = await fetch(`/api/messages?${params}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages((prev) => [...prev, ...data.messages]);
          lastPolledAt.current = data.messages[data.messages.length - 1].created_at;
        }
      } catch {
        // Silent — a missed poll just gets picked up next cycle.
      }
    };

    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [mode, sessionId, open]);

  const sendAiMessage = useCallback(async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, sender: 'visitor', content: text, created_at: new Date().toISOString() },
    ]);
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });
      const data = await res.json();
      if (data.sessionId && data.sessionId !== sessionId) setSessionId(data.sessionId);
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: `local-${Date.now()}-r`, sender: 'ai', content: data.reply, created_at: new Date().toISOString() },
        ]);
      } else {
        // The request succeeded but returned an error (e.g. missing
        // database tables, missing API key) — previously this failed
        // completely silently, showing nothing at all.
        setMessages((prev) => [
          ...prev,
          { id: `local-${Date.now()}-err`, sender: 'ai', content: data.error || "Sorry, something went wrong. Please try again, or click 'Talk to a human' below.", created_at: new Date().toISOString() },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `local-${Date.now()}-e`, sender: 'ai', content: "Sorry, something went wrong. Please try again, or click 'Talk to a human' below.", created_at: new Date().toISOString() },
      ]);
    } finally {
      setSending(false);
    }
  }, [sessionId]);

  const sendHandoffMessage = useCallback(async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, sender: 'visitor', content: text, created_at: new Date().toISOString() },
    ]);
    setSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      });
    } catch {
      // The message still shows locally; polling will reconcile once the connection recovers.
    } finally {
      setSending(false);
    }
  }, [sessionId]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    if (mode === 'handoff') {
      sendHandoffMessage(text);
    } else {
      sendAiMessage(text);
    }
  };

  const handleTalkToHuman = async () => {
    setHandingOff(true);
    try {
      const res = await fetch('/api/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.sessionId) setSessionId(data.sessionId);
      setMode('handoff');
      setMessages((prev) => [
        ...prev,
        { id: `local-${Date.now()}-h`, sender: 'agent', content: "You're now connected with our support team — they'll reply here shortly.", created_at: new Date().toISOString() },
      ]);
      lastPolledAt.current = new Date().toISOString();
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `local-${Date.now()}-he`, sender: 'ai', content: "Sorry, live chat isn't available right now. Please try again in a moment.", created_at: new Date().toISOString() },
      ]);
    } finally {
      setHandingOff(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Placed after all hooks (Rules of Hooks) — this is an internal tool
  // page, not customer-facing, so the support widget doesn't belong here.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {open && (
        <div style={{
          width: 340, maxWidth: 'calc(100vw - 48px)', height: 480, maxHeight: 'calc(100vh - 120px)',
          background: '#fff', borderRadius: 18, boxShadow: '0 20px 60px rgba(11,18,32,0.18)',
          display: 'flex', flexDirection: 'column', marginBottom: 12, overflow: 'hidden',
          border: '1px solid rgba(11,18,32,0.08)',
        }}>
          <div style={{
            background: '#0CC0DF', padding: '16px 18px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0,
          }}>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 15, color: '#fff' }}>
                Webhosting NZ
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                {mode === 'handoff' ? 'Connected with support' : "Chat with our AI assistant"}
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer',
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.length === 0 && (
              <div style={{ fontSize: 13.5, color: 'rgba(11,18,32,0.5)', textAlign: 'center', marginTop: 20 }}>
                Hi! Ask me anything about our hosting plans, or click below to reach our team directly.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} style={{
                alignSelf: m.sender === 'visitor' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.sender === 'visitor' ? '#0CC0DF' : '#f7fdfe',
                color: m.sender === 'visitor' ? '#fff' : '#0b1220',
                padding: '9px 13px', borderRadius: 14,
                fontSize: 13.5, lineHeight: 1.45,
                whiteSpace: 'pre-wrap',
              }}>
                {m.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {mode === 'ai' && (
            <div style={{ padding: '0 14px 10px' }}>
              <button onClick={handleTalkToHuman} disabled={handingOff} style={{
                width: '100%', padding: '9px 10px', borderRadius: 10, border: '1px solid rgba(12,192,223,0.3)',
                background: '#fff', color: '#0aa5c0', fontSize: 12.5, fontWeight: 700, cursor: handingOff ? 'default' : 'pointer',
                opacity: handingOff ? 0.6 : 1,
              }}>
                {handingOff ? 'Connecting…' : 'Talk to a human'}
              </button>
            </div>
          )}

          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(11,18,32,0.06)', display: 'flex', gap: 8, flexShrink: 0 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              style={{
                flex: 1, resize: 'none', padding: '9px 12px', borderRadius: 10,
                border: '1px solid rgba(11,18,32,0.15)', fontSize: 13.5, fontFamily: 'inherit',
                maxHeight: 80,
              }}
            />
            <button onClick={handleSend} disabled={sending || !input.trim()} style={{
              background: '#0CC0DF', color: '#fff', border: 'none', borderRadius: 10,
              width: 40, flexShrink: 0, cursor: sending ? 'default' : 'pointer',
              opacity: sending || !input.trim() ? 0.6 : 1,
            }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          width: 58, height: 58, borderRadius: '50%', border: 'none',
          background: '#0CC0DF', color: '#fff', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(12,192,223,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginLeft: 'auto',
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
