import { NextRequest, NextResponse } from 'next/server';
import { getSession, addMessage, getMessages } from '../../lib/chatStore';
import { sendWhatsAppMessage } from '../../lib/whatsapp';

// Visitor sends a message during an active human handoff — stores it and
// forwards it to the agent on WhatsApp, tagged so it can be identified.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sessionId = body?.sessionId;
    const message = String(body?.message || '').trim();

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Session and message are required.' }, { status: 400 });
    }

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }

    await addMessage(session.id, 'visitor', message);

    const supportNumber = process.env.SUPPORT_WHATSAPP_TO;
    if (supportNumber) {
      try {
        await sendWhatsAppMessage(supportNumber, `[#${session.tag}] ${message}`);
      } catch (err) {
        // Message is still saved even if the WhatsApp forward fails — log
        // it but don't fail the visitor's request over a delivery issue.
        console.error('Failed to forward message to WhatsApp:', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Message send error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

// Widget polls this every few seconds while in handoff mode to pick up new
// agent replies (and the AI's own replies too, for a unified history).
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const since = searchParams.get('since') || undefined;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required.' }, { status: 400 });
    }

    const messages = await getMessages(sessionId, since);
    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error('Message poll error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
