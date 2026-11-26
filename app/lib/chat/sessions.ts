import { getSupabaseAdmin } from '../supabase';

export type ChatMode = 'ai' | 'human';
export type ChatSession = {
  id: string;
  short_id: string;
  mode: ChatMode;
  page: string | null;
  country: string | null;
  name: string | null;
  email: string | null;
  tg_thread_id: number | null; // this visitor's own Telegram topic (when the owner chat is a Topics group)
};
export type StoredMessage = { id: number; role: 'user' | 'assistant' | 'agent'; content: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s: unknown): s is string => typeof s === 'string' && UUID.test(s);

const COLS = 'id, short_id, mode, page, country, name, email, tg_thread_id';

export async function getSessionByThread(threadId: number): Promise<ChatSession | null> {
  const { data } = await getSupabaseAdmin().from('chat_sessions').select(COLS).eq('tg_thread_id', threadId).maybeSingle();
  return (data as ChatSession) || null;
}

export async function getSession(id: string): Promise<ChatSession | null> {
  if (!isUuid(id)) return null;
  const { data } = await getSupabaseAdmin().from('chat_sessions').select(COLS).eq('id', id).maybeSingle();
  return (data as ChatSession) || null;
}

export async function getSessionByShortId(shortId: string): Promise<ChatSession | null> {
  const { data } = await getSupabaseAdmin().from('chat_sessions').select(COLS).eq('short_id', shortId.toLowerCase()).maybeSingle();
  return (data as ChatSession) || null;
}

export async function createSession(page: string, country: string | null): Promise<ChatSession> {
  const { data, error } = await getSupabaseAdmin()
    .from('chat_sessions')
    .insert({ page, country })
    .select(COLS)
    .single();
  if (error || !data) throw new Error('Could not create chat session');
  return data as ChatSession;
}

export async function touchSession(id: string, patch: Partial<Pick<ChatSession, 'page' | 'name' | 'email' | 'mode' | 'tg_thread_id'>> = {}) {
  await getSupabaseAdmin()
    .from('chat_sessions')
    .update({ last_seen: new Date().toISOString(), ...patch })
    .eq('id', id);
}

export async function addMessage(sessionId: string, role: StoredMessage['role'], content: string) {
  await getSupabaseAdmin().from('chat_messages').insert({ session_id: sessionId, role, content });
}

export async function getHistory(sessionId: string, limit = 30): Promise<StoredMessage[]> {
  const { data } = await getSupabaseAdmin()
    .from('chat_messages')
    .select('id, role, content')
    .eq('session_id', sessionId)
    .order('id', { ascending: false })
    .limit(limit);
  return ((data as StoredMessage[]) || []).reverse();
}

export async function getAgentMessagesAfter(sessionId: string, after: number): Promise<StoredMessage[]> {
  const { data } = await getSupabaseAdmin()
    .from('chat_messages')
    .select('id, role, content')
    .eq('session_id', sessionId)
    .eq('role', 'agent')
    .gt('id', after)
    .order('id', { ascending: true })
    .limit(20);
  return (data as StoredMessage[]) || [];
}
