import { NextRequest, NextResponse } from 'next/server';
import { checkCredentials, checkCredentialsDebug, createSessionToken, ADMIN_COOKIE_NAME } from '../../../lib/adminAuth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const username = body?.username;
  const password = body?.password;

  // TEMPORARY DIAGNOSTIC — logs only lengths and mismatch INDEX numbers,
  // never actual values, to pinpoint exactly where the comparison fails.
  // Remove this block once login is confirmed working.
  if (typeof username === 'string' && typeof password === 'string') {
    const debug = checkCredentialsDebug(username, password);
    console.log('[login-debug]', JSON.stringify({
      submittedUsernameLength: username.length,
      submittedPasswordLength: password.length,
      envUsernameLength: (process.env.ADMIN_USERNAME || '').length,
      envPasswordLength: (process.env.ADMIN_PASSWORD || '').length,
      ...debug,
    }));
  }

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
