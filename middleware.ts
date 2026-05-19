import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId     = request.cookies.get('session_user_id')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage      = pathname === '/login' || pathname === '/register';
  const isProtectedPage = pathname.startsWith('/profile') || pathname.startsWith('/checkout');

  if (isAuthPage && userId) {
    const from = request.nextUrl.searchParams.get('from');
    const dest = from && from.startsWith('/') ? from : '/profile';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (isProtectedPage && !userId) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/profile/:path*', '/checkout/:path*'],
};
