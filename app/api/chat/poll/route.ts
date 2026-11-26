import { NextRequest, NextResponse } from 'next/server';
import { getAgentMessagesAfter, getSession, isUuid, touchSession } from '../../../lib/chat/sessions';

export const runtime = 'nodejs';

// The chat widget polls this every few seconds to pick up replies you send from Telegram.
export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get('sid');
  const after = parseInt(req.nextUrl.searchParams.get('after') || '0', 10) || 0;
  if (!isUuid(sid)) return NextResponse.json({ messages: [], mode: 'ai' });

  try {
    const session = await getSession(sid);
    if (!session) return NextResponse.json({ messages: [], mode: 'ai' });
    const messages = await getAgentMessagesAfter(sid, after);
    if (messages.length) await touchSession(sid);
    return NextResponse.json(
      { messages, mode: session.mode },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Chat poll error:', err);
    return NextResponse.json({ messages: [], mode: 'ai' });
  }
}
