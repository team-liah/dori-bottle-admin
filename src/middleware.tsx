// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathList = [
    {
      path: '/',
      asPath: '/dashboard',
    },
    {
      path: '/user',
      asPath: '/user/user',
    },
    {
      path: '/bus',
      asPath: '/bus/station',
    },
  ];

  const url = request.nextUrl.clone();
  const targetPath = pathList.find((path) => path.path === url.pathname);
  if (targetPath) {
    url.pathname = targetPath.asPath;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
