import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  //  const accessToken = request.cookies.get("nextAuthAccesstoken")?.value;
  //  console.log(accessToken)
  //  console.log('object')
  const token = await getToken({req : request, secret: process.env.NEXTAUTH_SECRET });
  
  const isRootPath = request.nextUrl.pathname === '/';

  if (isRootPath && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};