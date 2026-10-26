import { type NextRequest, NextResponse } from 'next/server';

import { buildContentSecurityPolicy, NONCE_HEADER, securityHeaders } from '@/lib/security/headers';

const CSP_HEADER = 'Content-Security-Policy';

/** The API's origin for the CSP, or undefined if NEXT_PUBLIC_API_URL is missing or invalid. */
function apiOrigin(): string | undefined {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? '').origin;
  } catch {
    return undefined;
  }
}

/**
 * Runs before every page. Sets the security headers, with a fresh CSP nonce that the root layout
 * reads from NONCE_HEADER. There is no sign-in redirect until API auth is wired (ADR 0008).
 */
export function proxy(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const nonce = btoa(crypto.randomUUID());
  const csp = buildContentSecurityPolicy({ nonce, apiOrigin: apiOrigin(), isDevelopment });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(NONCE_HEADER, nonce);
  requestHeaders.set(CSP_HEADER, csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set(CSP_HEADER, csp);
  for (const [name, value] of Object.entries(securityHeaders({ isProduction: !isDevelopment }))) {
    response.headers.set(name, value);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
