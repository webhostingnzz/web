import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createSession, getSession, addMessage, getMessages } from '../../lib/chatStore';

const SYSTEM_PROMPT = `You are a friendly, knowledgeable support assistant for Webhosting NZ, a New Zealand web hosting company offering Web Hosting, WordPress Hosting, VPS Hosting, Cloud Servers, Website Builder Hosting, Business Email Hosting, Domain registration, and Web Design services.

Keep replies short and conversational (a few sentences, not long essays) — this is a website chat widget, not an email. Be helpful and specific when you can, but if a question needs account-specific details, billing info, or something you're not confident about, suggest they click "Talk to a human" to reach the support team directly rather than guessing.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let sessionId = body?.sessionId;
    const message = String(body?.message || '').trim();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    let session = sessionId ? await getSession(sessionId) : null;
    if (!session) {
      session = await createSession();
      sessionId = session.id;
    }

    await addMessage(session.id, 'visitor', message);

    const history = await getMessages(session.id);
    const anthropicMessages = history
      .filter((m) => m.sender === 'visitor' || m.sender === 'ai')
      .map((m) => ({
        role: (m.sender === 'visitor' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      }));

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('Chat error: ANTHROPIC_API_KEY is not configured');
      return NextResponse.json({ error: 'Chat is temporarily unavailable.' }, { status: 500 });
    }

    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    });

    const replyBlock = response.content.find((b) => b.type === 'text');
    const reply = replyBlock && replyBlock.type === 'text' ? replyBlock.text : "Sorry, I didn't quite catch that — could you rephrase?";

    await addMessage(session.id, 'ai', reply);

    return NextResponse.json({ sessionId: session.id, reply });
  } catch (err: any) {
    console.error('Chat error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
