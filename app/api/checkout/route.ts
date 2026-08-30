import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCustomPricing } from '../../lib/getCustomPricing';

// Hardcoded fallback — used if the database has no rows yet or is briefly
// unreachable, so checkout never breaks even if Supabase has an issue.
const FALLBACK_TIERS: Record<string, { name: string; description: string; amountCents: number }> = {
  starter: {
    name: 'Web Design — Starter',
    description: '3 Custom Pages, Mobile Responsive, Basic SEO',
    amountCents: 11900,
  },
  pro: {
    name: 'Web Design — Business Pro',
    description: '10 Custom Pages, Free 1 Year Hosting, Blog & News Section, Advanced SEO & Speed',
    amountCents: 22900,
  },
  enterprise: {
    name: 'Web Design — Enterprise',
    description: 'Unlimited Pages, Full Online Store, Payment Integration',
    amountCents: 49900,
  },
};

const TIER_ITEM_NAMES: Record<string, string> = {
  starter: 'Starter',
  pro: 'Business Pro',
  enterprise: 'Enterprise',
};

async function getTierPricing(tierKey: string) {
  const fallback = FALLBACK_TIERS[tierKey];
  try {
    const items = await getCustomPricing('web_design');
    const match = items.find((i) => i.item_name === TIER_ITEM_NAMES[tierKey]);
    if (!match) return fallback;
    return {
      name: `Web Design — ${match.item_name}`,
      description: match.specs.description || fallback.description,
      amountCents: Math.round(match.price * 100),
    };
  } catch (err) {
    console.error('Failed to fetch Web Design pricing, using fallback:', err);
    return fallback;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Created here, not at module scope, so the build doesn't fail in
    // environments where STRIPE_SECRET_KEY isn't set yet (Stripe's SDK
    // throws immediately in its constructor if the key is missing).
    // No apiVersion is specified — the installed Stripe package already
    // knows the correct version to use for itself; pinning a guessed
    // version string here can cause requests to fail if it doesn't match.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

    const body = await request.json();
    const tierKey = body?.tier;
    if (!tierKey || !FALLBACK_TIERS[tierKey]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }
    const tier = await getTierPricing(tierKey);

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
      custom_fields: [
        {
          key: 'company_name',
          label: { type: 'custom', custom: 'Company Name' },
          type: 'text',
        },
        {
          key: 'contact_number',
          label: { type: 'custom', custom: 'Contact Number' },
          type: 'text',
        },
        {
          key: 'web_design_info',
          label: { type: 'custom', custom: 'Web Design Info (preferred colors, style, etc.)' },
          type: 'text',
          optional: true,
          text: { maximum_length: 255 },
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
    // Temporarily including the real error message so we can diagnose setup
    // issues (missing/invalid API key, etc.) from the browser without needing
    // server log access. Safe to remove once checkout is confirmed working.
    return NextResponse.json({ error: err?.message || 'Unable to start checkout' }, { status: 500 });
  }
}
