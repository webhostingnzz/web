import { NextRequest, NextResponse } from 'next/server';
import { tgSend } from '../../../lib/chat/telegram';
import { addMessage, getSessionByShortId, touchSession } from '../../../lib/chat/sessions';

export const runtime = 'nodejs';

// Telegram calls this whenever you message your bot.
// Reply to any visitor message from the bot:
//   - normal text  -> sent live into the visitor's chat window, AI stops answering (you took over)
//   - /ai          -> hand the chat back to the AI
//   - /human       -> take over without sending a message
// Register it once (after deploying) - see the setWebhook command in the setup notes.
export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  const ownerId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!secret || !ownerId || req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update = await req.json();
    const msg = update?.message;
    // Only you can control chats. Ignore everyone else who finds the bot.
    if (!msg || String(msg.chat?.id) !== ownerId || typeof msg.text !== 'string') {
      return NextResponse.json({ ok: true });
    }

    const text: string = msg.text.trim();
    const repliedTo: string = msg.reply_to_message?.text || '';
    const m = repliedTo.match(/#([a-f0-9]{6})\b/i);

    if (!m) {
      await tgSend(
        'To answer a visitor, swipe-reply to one of their messages (the ones with a # code). Reply /ai to hand a chat back to the AI, or /human to take over without sending anything.'
      );
      return NextResponse.json({ ok: true });
    }

    const session = await getSessionByShortId(m[1]);
    if (!session) {
      await tgSend(`Chat #${m[1]} was not found.`);
      return NextResponse.json({ ok: true });
    }

    const cmd = text.toLowerCase();
    if (cmd === '/ai') {
      await touchSession(session.id, { mode: 'ai' });
      await tgSend(`🤖 Chat #${session.short_id} is back with the AI.`);
    } else if (cmd === '/human') {
      await touchSession(session.id, { mode: 'human' });
      await tgSend(`🧑 You are in control of chat #${session.short_id}. The AI will stay quiet.`);
    } else if (text.startsWith('/')) {
      await tgSend('Unknown command. Use /ai or /human as a reply to a visitor message.');
    } else {
      await addMessage(session.id, 'agent', text.slice(0, 2000));
      await touchSession(session.id, { mode: 'human' });
      await tgSend(`✅ Sent to #${session.short_id}. You are in control (AI paused). Reply /ai to hand back.`);
    }
  } catch (err) {
    console.error('Telegram webhook error:', err);
  }
  return NextResponse.json({ ok: true });
}
