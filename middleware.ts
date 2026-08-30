import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from './app/lib/adminAuth';

export async function middleware(request: NextRequest) {
  // next.config.js has trailingSlash: true, so the actual pathname here can
  // be "/admin/login/" (with a trailing slash) — normalize it before
  // comparing, otherwise the login page itself gets treated as a
  // protected route, redirecting to itself forever (ERR_TOO_MANY_REDIRECTS).
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
