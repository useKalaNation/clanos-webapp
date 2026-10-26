# 0008 · No sign-in gate until API auth

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

`proxy.ts` sent visitors without a `clanos_session` cookie from app routes to `/sign-in`. There's no API yet and sign-in isn't built, so nobody can get that cookie for real: everyone building or reviewing screens had to add a fake one in dev tools first. The gate only checked that the cookie existed, so it protected nothing; app routes show placeholders and no data.

## Decision

- **Remove the sign-in redirect** from the proxy, along with `SESSION_COOKIE_NAME`, until the API's auth is wired. Every route opens without a session.
- **Keep everything else** the proxy does: the per-request CSP nonce and the security headers.
- **Keep `isAppRoute`** in `src/lib/routes.ts`, the list of routes the gate will cover again.

## Consequences

- Screens can be built, reviewed and screenshotted at any URL, with no cookie setup.
- Nothing is less safe: the API is the authority on who is signed in, and there's no API data to protect yet.
- **The gate has to come back with sign-in.** The pull request that wires the API's auth restores the redirect to `/sign-in?next=…` (using `safeNextPath`), `SESSION_COOKIE_NAME` in `.env.example` and CI, and the proxy tests, and supersedes this ADR.
