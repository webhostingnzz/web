import { NextRequest, NextResponse } from 'next/server';
import { getSessionByTag, addMessage, setSessionStatus } from '../../lib/chatStore';

// Meta calls this once when you connect the webhook in the Meta dashboard,
// to prove you control this URL. Must echo back hub.challenge as plain
// text if hub.verify_token matches what's configured.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Meta calls this every time a message is sent to the business WhatsApp
// number — including the agent's replies to visitors. We look for the
// [#tag] the agent was asked to keep at the start of their reply, match it
// to a session, and store the reply so the widget's polling picks it up.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Not every webhook call is an incoming message (some are delivery/read
    // status updates) — just acknowledge those with 200 and do nothing.
    if (!message || message.type !== 'text') {
      return NextResponse.json({ ok: true });
    }

    const text = message.text?.body || '';
    const tagMatch = text.match(/^\[#([a-z0-9]{4})\]\s*/i);

    if (!tagMatch) {
      console.error('WhatsApp reply received with no recognizable [#tag]:', text);
      return NextResponse.json({ ok: true });
    }

    const tag = tagMatch[1].toLowerCase();
    const replyText = text.slice(tagMatch[0].length).trim();

    const session = await getSessionByTag(tag);
    if (!session) {
      console.error(`WhatsApp reply tag [#${tag}] didn't match any session`);
      return NextResponse.json({ ok: true });
    }

    await addMessage(session.id, 'agent', replyText);
    if (session.status !== 'handoff') {
      await setSessionStatus(session.id, 'handoff');
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('WhatsApp webhook error:', err);
    // Still return 200 — Meta will retry aggressively (and eventually
    // disable the webhook) if it keeps seeing non-200 responses.
    return NextResponse.json({ ok: true });
  }
}
