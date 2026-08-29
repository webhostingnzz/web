import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Prices are defined here (not trusted from the browser) so nobody can
// tamper with the amount by editing the request before it hits Stripe.
const TIERS: Record<string, { name: string; description: string; amountCents: number }> = {
  starter: {
    name: 'Web Design — Starter',
    description: '3 Custom Pages, Mobile Responsive, Basic SEO',
    amountCents: 11900, // $119 NZD
  },
  pro: {
    name: 'Web Design — Business Pro',
    description: '10 Custom Pages, Free 1 Year Hosting, Blog & News Section, Advanced SEO & Speed',
    amountCents: 22900, // $229 NZD
  },
  enterprise: {
    name: 'Web Design — Enterprise',
    description: 'Unlimited Pages, Full Online Store, Payment Integration',
    amountCents: 49900, // $499 NZD
  },
};

export async function POST(request: NextRequest) {
  try {
    // Created here, not at module scope, so the build doesn't fail in
    // environments where STRIPE_SECRET_KEY isn't set yet (Stripe's SDK
    // throws immediately in its constructor if the key is missing).
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-01-27.acacia' as any,
    });

    const body = await request.json();
    const tierKey = body?.tier;
    const tier = TIERS[tierKey];

    if (!tier) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || `https://${request.headers.get('host')}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/web-design-service/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/web-design-service?checkout=cancelled`,
      metadata: {
        tier: tierKey,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout session error:', err);
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
