const COOKIE_NAME = 'whnz_admin_session';
const SESSION_HOURS = 12;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return secret;
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const withPadding = padded + '='.repeat((4 - (padded.length % 4)) % 4);
  return atob(withPadding);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = base64UrlEncode(String(expiry));
  const signature = await hmacSign(payload, getSecret());
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = await hmacSign(payload, getSecret());
  if (!timingSafeEqual(signature, expectedSignature)) return false;

  const expiry = Number(base64UrlDecode(payload));
  if (!expiry || Date.now() > expiry) return false;

  return true;
}

export function checkPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return timingSafeEqual(password, adminPassword);
}

export function checkCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;
  // Check both independently (not short-circuited) so a wrong username
  // doesn't reveal timing info about whether the password was close.
  const usernameOk = timingSafeEqual(username, adminUsername);
  const passwordOk = timingSafeEqual(password, adminPassword);
  return usernameOk && passwordOk;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
