import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ['data.line_items'],
    });

    const orders = sessions.data
      .filter((s) => s.status === 'complete')
      .map((s) => {
        const customFields: Record<string, string> = {};
        (s.custom_fields || []).forEach((f: any) => {
          const value = f.text?.value || f.dropdown?.value || f.numeric?.value || '';
          customFields[f.key] = value;
        });

        return {
          id: s.id,
          created: s.created,
          amount_total: s.amount_total,
          currency: s.currency,
          customer_email: s.customer_details?.email || null,
          customer_name: s.customer_details?.name || null,
          tier: s.metadata?.tier || null,
          company_name: customFields['company_name'] || null,
          contact_number: customFields['contact_number'] || null,
          web_design_info: customFields['web_design_info'] || null,
        };
      });

    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error('Admin orders fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
