import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

async function sendNotificationEmail(session: Stripe.Checkout.Session) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const tier = session.metadata?.tier || 'unknown';
  const amount = ((session.amount_total || 0) / 100).toFixed(2);
  const customerEmail = session.customer_details?.email || 'not provided';
  const customerName = session.customer_details?.name || 'not provided';

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject: `New Web Design order — ${tier} (NZ$${amount})`,
    text: `You just received a new Web Design Service order.\n\nTier: ${tier}\nAmount: NZ$${amount}\nCustomer name: ${customerName}\nCustomer email: ${customerEmail}\nStripe session ID: ${session.id}`,
  });
}

export async function POST(request: NextRequest) {
  // Created here, not at module scope, so the build doesn't fail in
  // environments where STRIPE_SECRET_KEY isn't set yet (Stripe's SDK
  // throws immediately in its constructor if the key is missing).
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sendNotificationEmail(session);
    } catch (err) {
      // Don't fail the webhook response over an email issue — Stripe would
      // otherwise retry the whole event repeatedly. Just log it.
      console.error('Failed to send order notification email:', err);
    }
  }

  return NextResponse.json({ received: true });
}
