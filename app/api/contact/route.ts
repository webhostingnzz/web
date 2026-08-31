import { NextRequest, NextResponse } from 'next/server';
import { checkCredentials, createSessionToken, ADMIN_COOKIE_NAME } from '../../../lib/adminAuth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const username = body?.username;
  const password = body?.password;

  // TEMPORARY DIAGNOSTIC — logs only character LENGTHS, never the actual
  // values, to help pinpoint a whitespace/typo mismatch without exposing
  // any secrets. Safe to check in Hostinger's Runtime Logs. Remove this
  // block once login is confirmed working.
  console.log('[login-debug] submitted username length:', typeof username === 'string' ? username.length : 'not a string');
  console.log('[login-debug] submitted password length:', typeof password === 'string' ? password.length : 'not a string');
  console.log('[login-debug] env ADMIN_USERNAME length:', (process.env.ADMIN_USERNAME || '').length, '| is set:', !!process.env.ADMIN_USERNAME);
  console.log('[login-debug] env ADMIN_PASSWORD length:', (process.env.ADMIN_PASSWORD || '').length, '| is set:', !!process.env.ADMIN_PASSWORD);

  if (typeof username !== 'string' || typeof password !== 'string' || !checkCredentials(username, password)) {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return response;
}
