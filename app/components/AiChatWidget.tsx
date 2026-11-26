'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from './AiChatWidget.module.css';

type Msg = { role: 'user' | 'assistant'; content: string; agent?: boolean };

const STORAGE_KEY = 'whnz_ai_chat_v2';
const VISIT_KEY = 'whnz_visit_pinged';
const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hi! I'm Junia, Webhosting NZ's AI assistant. Ask me about hosting plans, domains, email or web design, and I can check a domain for you or connect you with our team.",
};
const SUGGESTIONS = [
  'Which hosting plan is right for me?',
  'Is a .co.nz domain available?',
  "What's included with WordPress hosting?",
  'Can I talk to a real person?',
];

// Minimal, safe formatting: bold, links, bullets. Everything is escaped first.
function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function inline(s: string) {
  let t = esc(s);
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  t = t.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;!?])/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return t;
}
function render(text: string): ReactNode {
  const blocks: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push('<ul>' + list.map((l) => `<li>${inline(l)}</li>`).join('') + '</ul>');
      list = [];
    }
  };
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*[-*•]\s+(.*)$/);
    if (m) list.push(m[1]);
    else {
      flush();
      if (line.trim()) blocks.push(`<p>${inline(line)}</p>`);
    }
  }
  flush();
  return <span dangerouslySetInnerHTML={{ __html: blocks.join('') }} />;
}

export default function AiChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false); // panel mounted (stays true while animating out)
  const [shown, setShown] = useState(false); // panel in its visible state (drives the CSS transition)
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [handedOff, setHandedOff] = useState(false);
  const [human, setHuman] = useState(false); // a team member is in control
  const [unread, setUnread] = useState(false);
  const [sid, setSid] = useState<string | null>(null);
  const [lastAgentId, setLastAgentId] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  // restore conversation
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.msgs?.length) {
        setMsgs(saved.msgs);
        setHandedOff(!!saved.handedOff);
        setHuman(!!saved.human);
        setSid(saved.sid || null);
        setLastAgentId(saved.lastAgentId || 0);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ msgs: msgs.slice(-30), handedOff, human, sid, lastAgentId }));
    } catch {
      /* ignore */
    }
  }, [msgs, handedOff, human, sid, lastAgentId]);

  // live-visitor ping, once per browser session
  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    try {
      if (sessionStorage.getItem(VISIT_KEY)) return;
      sessionStorage.setItem(VISIT_KEY, '1');
    } catch {
      /* ignore */
    }
    fetch('/api/chat/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: window.location.pathname, referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pick up replies the team sends from Telegram
  useEffect(() => {
    if (!sid) return;
    let stop = false;
    const tick = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(`/api/chat/poll?sid=${sid}&after=${lastAgentIdRef.current}`, { cache: 'no-store' });
        const data = await res.json();
        if (stop) return;
        setHuman(data.mode === 'human');
        if (data.messages?.length) {
          const fresh: Msg[] = data.messages.map((m: { content: string }) => ({ role: 'assistant', content: m.content, agent: true }));
          lastAgentIdRef.current = data.messages[data.messages.length - 1].id;
          setLastAgentId(lastAgentIdRef.current);
          setMsgs((prev) => [...prev.filter((m) => m.content || m.role === 'user'), ...fresh]);
          setHandedOff(false);
          if (!openRef.current) setUnread(true);
        }
      } catch {
        /* network blip, try again next tick */
      }
    };
    const iv = setInterval(tick, open ? 3000 : 10000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [sid, open]);
  const lastAgentIdRef = useRef(0);
  lastAgentIdRef.current = Math.max(lastAgentIdRef.current, lastAgentId);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, status, open]);

  useEffect(() => {
    if (!open) return;
    setUnread(false);
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    // On phones the chat is full screen: stop the page behind it from scrolling.
    const phone = window.matchMedia('(max-width: 520px)').matches;
    const prevOverflow = document.body.style.overflow;
    if (phone) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      if (phone) document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Smooth open/close: keep the panel mounted while it animates out, then unmount.
  useEffect(() => {
    if (open) {
      setRendered(true);
      const t = setTimeout(() => setShown(true), 20); // lets the closed state paint first so the CSS transition runs
      return () => clearTimeout(t);
    }
    setShown(false);
    const t = setTimeout(() => setRendered(false), 220);
    return () => clearTimeout(t);
  }, [open]);

  if (pathname?.startsWith('/admin')) return null;

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    setStatus('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid, page: window.location.pathname, message: content }),
      });
      if (!res.body) throw new Error('no stream');
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let answer = '';
      let gotHuman = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          if (!line.trim()) continue;
          const ev = JSON.parse(line);
          if (ev.t === 'sid') {
            setSid(ev.v);
          } else if (ev.t === 'text') {
            answer += ev.v;
            setStatus('');
            setMsgs([...history, { role: 'assistant', content: answer }]);
          } else if (ev.t === 'status') {
            setStatus(
              ev.v === 'check_domain'
                ? 'Checking domain…'
                : ev.v === 'request_live_agent'
                ? 'Contacting our team…'
                : ev.v === 'get_live_pricing'
                ? 'Looking up current prices…'
                : 'Searching the website…'
            );
          } else if (ev.t === 'handoff') {
            setHandedOff(true);
          } else if (ev.t === 'human') {
            gotHuman = true;
            setHuman(true);
          }
        }
      }
      if (!answer && !gotHuman) {
        setMsgs([...history, { role: 'assistant', content: 'Sorry, I could not answer that. Please try again.' }]);
      } else if (!answer) {
        setMsgs(history); // a team member is replying - their message arrives via polling
      }
    } catch {
      setMsgs([
        ...history,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or email admin@webhosting.co.nz.' },
      ]);
    } finally {
      setBusy(false);
      setStatus('');
    }
  }

  const showChips = msgs.length <= 1;
  const last = msgs[msgs.length - 1];
  const typing = busy && last?.role === 'assistant' && !last.content && !status;

  return (
    <>
      {rendered && (
        <div
          className={`${styles.panel} ${shown ? styles.panelOpen : ''}`}
          role="dialog"
          aria-label="Chat with Webhosting NZ"
          aria-hidden={!open}
        >
          <div className={styles.header}>
            <div className={styles.avatar} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z" />
              </svg>
            </div>
            <div className={styles.grow}>
              <div className={styles.title}>{human ? 'Webhosting NZ team' : 'Junia AI'}</div>
              <div className={styles.sub}>
                <span className={styles.dot} /> {human ? 'You are chatting with our team' : 'Team on standby'}
              </div>
            </div>
            {!handedOff && !human && (
              <button className={styles.human} onClick={() => send('I would like to talk to a human please.')} disabled={busy}>
                Talk to a human
              </button>
            )}
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close chat" title="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {!handedOff && !human && (
            <div className={styles.humanBar}>
              <span>Prefer a person?</span>
              <button onClick={() => send('I would like to talk to a human please.')} disabled={busy}>
                Talk to a human
              </button>
            </div>
          )}

          <div className={styles.log} ref={logRef} aria-live="polite">
            {msgs.map((m, i) =>
              m.content ? (
                <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.me : styles.bot}`}>
                  {m.agent && <div className={styles.status}>Team member</div>}
                  {m.role === 'user' ? m.content : render(m.content)}
                </div>
              ) : null
            )}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`} aria-label="Junia is typing">
                <span className={styles.typing}>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            {status && <div className={styles.status}>{status}</div>}
            {handedOff && (
              <div className={styles.notice}>Our team has been notified and will reply to you here shortly.</div>
            )}
            {showChips && (
              <div className={styles.chips}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} className={styles.chip} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              className={styles.input}
              rows={1}
              value={input}
              maxLength={1500}
              placeholder="Type your question…"
              aria-label="Your message"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button className={styles.send} type="submit" disabled={busy || !input.trim()} aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
          <div className={styles.foot}>24x7 customer support service</div>
        </div>
      )}

      <button
        className={styles.bubble}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : unread ? 'Open chat - new reply from our team' : 'Open chat with Webhosting NZ'}
        aria-expanded={open}
      >
        <span className={styles.bubbleIconWrap}>
          <svg className={`${styles.bubbleIcon} ${open ? styles.iconOut : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          <svg className={`${styles.bubbleIcon} ${open ? '' : styles.iconOut}`} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
          {unread && <span className={styles.unread} aria-hidden="true" />}
        </span>
        <span className={styles.bubbleLabel}>{open ? 'Close' : 'Hello'}</span>
      </button>
    </>
  );
}
