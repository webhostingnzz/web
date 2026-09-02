// Sends messages via Meta's WhatsApp Cloud API directly (not Twilio) — this
// avoids Twilio's per-message fee. Since the visitor always messages first
// (by clicking "Talk to a human"), this qualifies as a Meta customer-
// initiated service conversation, which is free under Meta's current
// billing model, but does require the 24-hour messaging window to be open
// (the support number must have messaged the business first, or this will
// fail — see SETUP notes).
export async function sendWhatsAppMessage(to: string, text: string): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error('WhatsApp environment variables are not configured');
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`WhatsApp send failed (${res.status}): ${errorBody}`);
  }
}
