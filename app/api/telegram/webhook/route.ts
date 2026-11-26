import { NextRequest, NextResponse } from 'next/server';
import { tgSend } from '../../../lib/chat/telegram';
import { addMessage, getSessionByShortId, getSessionByThread, touchSession, type ChatSession } from '../../../lib/chat/sessions';

export const runtime = 'nodejs';

// Telegram calls this whenever you message your bot / group.
//
// Topics group (recommended): every visitor has their own topic. Just TYPE in that topic:
//   - normal text  -> sent live into that visitor's chat window, AI stops answering (you took over)
//   - /ai          -> hand the chat back to the AI
//   - /human       -> take over without sending a message
// Private chat with the bot: swipe-reply to a visitor message (the ones with a # code) instead.
// Register it once (after deploying) - see the setWebhook command in the setup notes.
export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  const ownerChat = process.env.TELEGRAM_CHAT_ID?.trim();
  const ownerUser = process.env.TELEGRAM_OWNER_ID?.trim(); // optional: only this Telegram user may answer
  if (!secret || !ownerChat || req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update = await req.json();
    const msg = update?.message;
    // Only your chat/group can control chats. Ignore everyone else who finds the bot.
    if (!msg || String(msg.chat?.id) !== ownerChat || typeof msg.text !== 'string' || msg.from?.is_bot) {
      return NextResponse.json({ ok: true });
    }
    if (ownerUser && String(msg.from?.id) !== ownerUser) {
      return NextResponse.json({ ok: true });
    }

    const text: string = msg.text.trim();
    const threadId: number | undefined = typeof msg.message_thread_id === 'number' ? msg.message_thread_id : undefined;

    // 1) which visitor? - the topic they are in, otherwise the #code of the message replied to
    let session: ChatSession | null = threadId ? await getSessionByThread(threadId) : null;
    if (!session) {
      const m = (msg.reply_to_message?.text || '').match(/#([a-f0-9]{6})\b/i);
      if (m) {
        session = await getSessionByShortId(m[1]);
        if (!session) {
          await tgSend(`Chat #${m[1]} was not found.`, { threadId });
          return NextResponse.json({ ok: true });
        }
      }
    }

    if (!session) {
      // not a visitor topic (e.g. the General topic) - stay quiet inside groups, help in private chats
      if (!threadId && msg.chat?.type === 'private') {
        await tgSend(
          'To answer a visitor, swipe-reply to one of their messages (the ones with a # code). Reply /ai to hand a chat back to the AI, or /human to take over without sending anything.'
        );
      }
      return NextResponse.json({ ok: true });
    }

    const inTopic = !!session.tg_thread_id && session.tg_thread_id === threadId;
    const label = inTopic ? 'this chat' : `chat #${session.short_id}`;
    const opts = { threadId: inTopic ? session.tg_thread_id : undefined };
    const cmd = text.toLowerCase().split('@')[0]; // groups send /ai@YourBot

    if (cmd === '/ai') {
      await touchSession(session.id, { mode: 'ai' });
      await tgSend(`🤖 ${label[0].toUpperCase() + label.slice(1)} is back with the AI.`, opts);
    } else if (cmd === '/human') {
      await touchSession(session.id, { mode: 'human' });
      await tgSend(`🧑 You are in control of ${label}. The AI will stay quiet.`, opts);
    } else if (text.startsWith('/')) {
      await tgSend(`Unknown command. Use /ai or /human${inTopic ? '' : ' as a reply to a visitor message'}.`, opts);
    } else {
      await addMessage(session.id, 'agent', text.slice(0, 2000));
      await touchSession(session.id, { mode: 'human' });
      await tgSend(`✅ Sent. You are in control (AI paused). ${inTopic ? 'Send' : 'Reply'} /ai to hand back.`, opts);
    }
  } catch (err) {
    console.error('Telegram webhook error:', err);
  }
  return NextResponse.json({ ok: true });
}
