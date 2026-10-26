// @vitest-environment node
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { proxy } from './proxy';

function visit(path: string) {
  return proxy(new NextRequest(new URL(path, 'https://app.clanos.test')));
}

describe('proxy', () => {
  it('opens app routes without a session until API auth is wired', () => {
    const response = visit('/clans/rvnt/members?tab=invitations');

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('leaves public routes open', () => {
    expect(visit('/sign-in').status).toBe(200);
    expect(visit('/invitations/abc123').status).toBe(200);
  });

  it('sets a nonce-based CSP and passes the same nonce to the app', () => {
    const response = visit('/sign-in');

    const csp = response.headers.get('content-security-policy') ?? '';
    const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
    expect(nonce).toBeTruthy();
    expect(response.headers.get('x-middleware-request-x-nonce')).toBe(nonce);
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it('uses a new nonce for every request', () => {
    const first = visit('/sign-in').headers.get('content-security-policy');
    const second = visit('/sign-in').headers.get('content-security-policy');

    expect(first).not.toBe(second);
  });

  it('sets the security headers on app routes too', () => {
    const response = visit('/dashboard');

    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('content-security-policy')).toBeTruthy();
  });
});
