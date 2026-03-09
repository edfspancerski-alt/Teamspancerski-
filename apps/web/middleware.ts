import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { prisma } from '@repo/database';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  if (url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  // Edge detection for tenant
  let tenantData = null;
  if (hostname && !hostname.includes('localhost')) {
    tenantData = await prisma.tenant.findUnique({
      where: { domain: hostname },
      select: { id: true, slug: true, primaryColor: true, logo: true }
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenantData?.id || 'default');
  requestHeaders.set('x-tenant-slug', tenantData?.slug || 'default');
  requestHeaders.set('x-tenant-color', tenantData?.primaryColor || '#3b82f6');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
