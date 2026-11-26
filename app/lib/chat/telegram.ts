// Telegram helpers. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
//
// TELEGRAM_CHAT_ID can be either:
//   - your private chat with the bot (all visitors share one stream, tagged with #codes), or
//   - a Telegram GROUP with Topics enabled and the bot as admin (Manage Topics): every visitor
//     then gets their OWN topic (thread), so chats stay separate.

export function telegramConfigured(): boolean {
  return !!(process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim());
}

async function call(method: string, payload: object): Promise<any | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) return null;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
      console.error(`Telegram ${method} failed:`, res.status, data?.description);
      return null;
    }
    return data.result;
  } catch (err) {
    console.error(`Telegram ${method} error:`, err);
    return null;
  }
}

export async function tgSend(text: string, opts: { threadId?: number | null; replyTo?: number } = {}): Promise<boolean> {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!chatId) return false;
  const result = await call('sendMessage', {
    chat_id: chatId,
    text: text.slice(0, 4000),
    disable_web_page_preview: true,
    ...(opts.threadId ? { message_thread_id: opts.threadId } : {}),
    ...(opts.replyTo ? { reply_to_message_id: opts.replyTo, allow_sending_without_reply: true } : {}),
  });
  return !!result;
}

// One topic per visitor. Returns null when the chat is not a Topics group (or the bot lacks
// the Manage Topics right) - callers then fall back to the single shared stream.
export async function tgCreateTopic(name: string): Promise<number | null> {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!chatId) return null;
  const result = await call('createForumTopic', { chat_id: chatId, name: name.slice(0, 120) });
  return typeof result?.message_thread_id === 'number' ? result.message_thread_id : null;
}

export async function tgRenameTopic(threadId: number, name: string): Promise<void> {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!chatId) return;
  await call('editForumTopic', { chat_id: chatId, message_thread_id: threadId, name: name.slice(0, 120) });
}
