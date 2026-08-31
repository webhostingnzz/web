// WHMCS API client. WHMCS uses a classic form-encoded POST API — you'll
// need to generate API credentials in WHMCS Admin under
// Setup > Staff Management > Manage API Credentials (or System Settings >
// API Credentials on older versions), then set these as environment
// variables:
//   WHMCS_API_URL         e.g. https://my.webhosting.co.nz/includes/api.php
//   WHMCS_API_IDENTIFIER
//   WHMCS_API_SECRET
//
// Important: WHMCS API access is usually IP-restricted for security. You'll
// likely need to add your Hostinger server's outbound IP to WHMCS's
// allowed API IPs (Setup > Staff Management > Manage API Credentials, or
// System Settings > General Settings > Security) before this will work.

async function callWhmcsApi(action: string, params: Record<string, string> = {}) {
  const apiUrl = process.env.WHMCS_API_URL;
  const identifier = process.env.WHMCS_API_IDENTIFIER;
  const secret = process.env.WHMCS_API_SECRET;

  // TEMPORARY DIAGNOSTIC — WHMCS_API_URL isn't a secret (it's just an
  // endpoint address), so it's safe to log directly. JSON.stringify makes
  // any hidden whitespace/control characters visible as escape sequences
  // (e.g. a stray space would show as a literal space inside the quotes,
  // a trailing newline would show as \n). Remove once this is fixed.
  console.log('[whmcs-debug] raw WHMCS_API_URL from env:', JSON.stringify(apiUrl));
  console.log('[whmcs-debug] length:', apiUrl ? apiUrl.length : 'undefined');

  if (!apiUrl || !identifier || !secret) {
    throw new Error('WHMCS API environment variables are not configured');
  }

  const body = new URLSearchParams({
    action,
    identifier,
    secret,
    responsetype: 'json',
    ...params,
  });

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`WHMCS API request failed with status ${res.status}`);
  }

  const data = await res.json();
  if (data.result === 'error') {
    throw new Error(`WHMCS API error: ${data.message}`);
  }

  return data;
}

export type WhmcsProduct = {
  pid: string;
  name: string;
  monthlyPrice: number | null;
};

// Fetches every product across every product group, with its monthly
// price. Products with no monthly pricing configured (e.g. domain-only,
// or a plan that's only sold annually) return monthlyPrice: null.
export async function getWhmcsProducts(): Promise<WhmcsProduct[]> {
  const data = await callWhmcsApi('GetProducts');
  const products = data?.products?.product || [];

  return products.map((p: any) => {
    const monthly = p?.pricing?.NZD?.monthly;
    const monthlyPrice = monthly && monthly !== '-1.00' ? parseFloat(monthly) : null;
    return {
      pid: String(p.pid),
      name: p.name,
      monthlyPrice,
    };
  });
}

export type WhmcsTldPrice = {
  tld: string;
  registerPrice: number | null;
};

// Fetches current domain TLD pricing (registration price, per year).
export async function getWhmcsTldPricing(): Promise<WhmcsTldPrice[]> {
  const data = await callWhmcsApi('GetTLDPricing');
  const pricing = data?.pricing || {};

  // TEMPORARY DIAGNOSTIC — this data isn't sensitive (just public TLD
  // pricing structure), safe to log directly. Shows exactly what WHMCS
  // returns so we can see the real currency key names, since "NZD" may
  // not be the exact key WHMCS uses for your account. Remove once domain
  // sync is confirmed working.
  const entries = Object.entries(pricing);
  console.log('[tld-debug] total TLDs returned:', entries.length);
  console.log('[tld-debug] first 3 raw entries:', JSON.stringify(entries.slice(0, 3), null, 2));

  return Object.entries(pricing).map(([tld, info]: [string, any]) => {
    const registerPrice = info?.register?.NZD ? parseFloat(info.register.NZD) : null;
    return { tld: `.${tld}`, registerPrice };
  });
}
