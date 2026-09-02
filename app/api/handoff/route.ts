import { NextRequest, NextResponse } from 'next/server';
import { getSession, createSession, setSessionStatus, getMessages, addMessage } from '../../lib/chatStore';
import { sendWhatsAppMessage } from '../../lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let sessionId = body?.sessionId;

    let session = sessionId ? await getSession(sessionId) : null;
    if (!session) {
      session = await createSession();
      sessionId = session.id;
    }

    await setSessionStatus(session.id, 'handoff');

    const supportNumber = process.env.SUPPORT_WHATSAPP_TO;
    if (!supportNumber) {
      console.error('Handoff error: SUPPORT_WHATSAPP_TO is not configured');
      return NextResponse.json({ error: 'Live chat is temporarily unavailable.' }, { status: 500 });
    }

    // Give the agent a little context — the last couple of messages from
    // this conversation, if any — so they're not starting completely blind.
    const history = await getMessages(session.id);
    const recentContext = history
      .slice(-4)
      .map((m) => `${m.sender === 'visitor' ? 'Visitor' : 'AI'}: ${m.content}`)
      .join('\n');

    const notifyText = `[#${session.tag}] New live chat request on webhosting.co.nz${recentContext ? `\n\nRecent context:\n${recentContext}` : ''}\n\nReply here with [#${session.tag}] at the start of your message to respond to the visitor.`;

    await sendWhatsAppMessage(supportNumber, notifyText);

    const systemMessage = "You're now connected with our support team — they'll reply here shortly.";
    await addMessage(session.id, 'agent', systemMessage);

    return NextResponse.json({ sessionId: session.id, ok: true });
  } catch (err: any) {
    console.error('Handoff error:', err);
    return NextResponse.json({ error: 'Something went wrong starting live chat. Please try again.' }, { status: 500 });
  }
}
