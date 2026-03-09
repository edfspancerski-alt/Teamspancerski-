import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { prisma } from '../../packages/database';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Skip API and static files
  if (url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  // Domain logic: support subdomains (e.g. coach1.teamspancerski.com)
  // For demo: assume hostname is the tenant slug or localhost:3000
  let tenantSlug = hostname?.split('.')[0];
  if (hostname?.includes('localhost')) {
    tenantSlug = 'default';
  }

  // Optional: Fetch tenant from DB to verify
  // const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

  // Inject tenant info into headers for use in server components/APIs
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-slug', tenantSlug || 'default');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
