// Telegram helpers. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (your own chat id).

export function telegramConfigured(): boolean {
  return !!(process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim());
}

export async function tgSend(text: string, replyToMessageId?: number): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4000),
        disable_web_page_preview: true,
        ...(replyToMessageId ? { reply_to_message_id: replyToMessageId, allow_sending_without_reply: true } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) console.error('Telegram send failed:', res.status);
    return res.ok;
  } catch (err) {
    console.error('Telegram send error:', err);
    return false;
  }
}
