import { getSupabaseAdmin } from './supabase';

export type ChatSession = {
  id: string;
  tag: string;
  status: 'ai' | 'handoff' | 'closed';
  visitor_name: string | null;
  created_at: string;
  last_activity_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  sender: 'visitor' | 'ai' | 'agent';
  content: string;
  created_at: string;
};

// Generates a short, easy-to-type routing tag the agent keeps in their
// WhatsApp replies so we know which visitor session to route back to.
function generateTag(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let tag = '';
  for (let i = 0; i < 4; i++) {
    tag += chars[Math.floor(Math.random() * chars.length)];
  }
  return tag;
}

export async function createSession(): Promise<ChatSession> {
  const supabase = getSupabaseAdmin();
  const tag = generateTag();
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({ tag, status: 'ai' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getSession(sessionId: string): Promise<ChatSession | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('id', sessionId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getSessionByTag(tag: string): Promise<ChatSession | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('tag', tag)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function setSessionStatus(sessionId: string, status: ChatSession['status']): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('chat_sessions')
    .update({ status, last_activity_at: new Date().toISOString() })
    .eq('id', sessionId);
  if (error) throw error;
}

export async function addMessage(sessionId: string, sender: ChatMessage['sender'], content: string): Promise<ChatMessage> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ session_id: sessionId, sender, content })
    .select()
    .single();
  if (error) throw error;

  await supabase
    .from('chat_sessions')
    .update({ last_activity_at: new Date().toISOString() })
    .eq('id', sessionId);

  return data;
}

export async function getMessages(sessionId: string, since?: string): Promise<ChatMessage[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (since) {
    query = query.gt('created_at', since);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}
