import { NextRequest, NextResponse } from 'next/server';

// Calls WHMCS's official API (DomainWhois command) server-side, so the
// API secret never reaches the browser. Configure these two values as
// Environment Variables in Vercel / Hostinger — never commit real values
// to this file or to GitHub.
//
//   WHMCS_URL        e.g. https://my.webhosting.co.nz
//   WHMCS_API_IDENTIFIER
//   WHMCS_API_SECRET
//
// Response shape matches what the existing frontend script already
// expects (ported from the original WordPress AJAX handler), so no
// frontend changes are needed beyond pointing it at this URL:
//   { success: true,  data: { status: 'available' | 'unavailable' } }
//   { success: false, data: { message: string } }

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData().catch(() => null);
    const domain = (body?.get('domain') as string) || '';

    if (!domain || !domain.includes('.')) {
      return NextResponse.json(
        { success: false, data: { message: 'Invalid domain' } },
        { status: 400 }
      );
    }

    const whmcsUrl = process.env.WHMCS_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!whmcsUrl || !identifier || !secret) {
      console.error('Missing WHMCS environment variables');
      return NextResponse.json(
        { success: false, data: { message: 'Domain lookup is not configured' } },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      action: 'DomainWhois',
      domain,
      identifier,
      secret,
      responsetype: 'json',
    });

    const whmcsRes = await fetch(`${whmcsUrl.replace(/\/$/, '')}/includes/api.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      // WHMCS can be slow under load; give it a reasonable ceiling.
      signal: AbortSignal.timeout(20000),
    });

    if (!whmcsRes.ok) {
      return NextResponse.json(
        { success: false, data: { message: 'Domain lookup failed' } },
        { status: 502 }
      );
    }

    const whmcsData = await whmcsRes.json();

    if (whmcsData.result !== 'success') {
      return NextResponse.json({
        success: false,
        data: { message: whmcsData.message || 'Lookup failed' },
      });
    }

    // WHMCS returns a status string — normalise to exactly what the
    // frontend checks for.
    const rawStatus = String(whmcsData.status || '').toLowerCase();
    const isAvailable = rawStatus.includes('available') && !rawStatus.includes('unavailable');

    return NextResponse.json({
      success: true,
      data: { status: isAvailable ? 'available' : 'unavailable' },
    });
  } catch (err) {
    console.error('Domain search error:', err);
    return NextResponse.json(
      { success: false, data: { message: 'Server error' } },
      { status: 500 }
    );
  }
}
