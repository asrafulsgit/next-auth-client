import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({req : request, secret: process.env.NEXTAUTH_SECRET });
  
   const pathname = request.nextUrl.pathname;

  const isPrivateRoute = pathname === '/';
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isAuthRoute = pathname === '/login' || pathname === '/register';

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register']
};