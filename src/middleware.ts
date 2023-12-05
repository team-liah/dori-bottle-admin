// middleware.ts
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = jwtDecode<{ role: string }>(request.cookies.get("access_token")?.value || "");

  if (token.role === "ROLE_ADMIN") {
    return NextResponse.next();
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}

export const config = {
  matcher: ["/admin/:path*", "/group/:path*", "/post/:path*", "/user/:path*", "/product/:path*", "/payment/:path*"],
};
