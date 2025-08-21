import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_SESSION_ENDPOINT = '/app/api/auth/session';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // allow static assets and public pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/app/api') || // allow auth API
    pathname.startsWith('/api') ||
    /\.[a-zA-Z0-9]+$/.test(pathname) // files like .png, .css
  ) {
    return NextResponse.next();
  }

  // check session by calling your BetterAuth endpoint with forwarded cookies
  const res = await fetch(`${origin}${AUTH_SESSION_ENDPOINT}`, {
    headers: { cookie: request.headers.get('cookie') ?? '' },
    cache: 'no-store',
  });

  if (res.ok) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', origin);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

// Set which URLs you want to gate here:
export const config = {
  matcher: [
    // Protect everything except the explicitly allowed paths above
    // '/((?!login|signup|_next|public|app/api|api).*)',

    // Or, protect specific root paths only:
    '/dashboard/:path*',
    // '/settings/:path*',
    // '/billing/:path*',
  ],
};