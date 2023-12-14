// middleware.ts
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token");
  const token = access_token ? jwtDecode<{ role: string }>(access_token.value) : null;

  if (token?.role === "ROLE_ADMIN") {
    return NextResponse.next();
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/group/:path*",
    "/post/:path*",
    "/user/:path*",
    "/product/:path*",
    "/payment/:path*",
    "/cup/:path*",
  ],
};
