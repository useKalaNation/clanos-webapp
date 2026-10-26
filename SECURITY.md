# Security

## Reporting a vulnerability

Please **don't open a public issue**. Report it privately through GitHub: the repository's **Security** tab → **Report a vulnerability**. Include what you found, how to reproduce it and what an attacker could do with it.

We'll acknowledge it and keep you updated until it's fixed. Please give us a reasonable time to release a fix before you disclose anything publicly.

## Rules for every change

These are the non-negotiable rules from [AGENTS.md](AGENTS.md#7-security-non-negotiable) section 7.

- **Secrets:** never commit them. Server-only values have no `NEXT_PUBLIC_` prefix and are read only in server code, in modules that start with `import 'server-only'`. Only `.env.example` is committed. CI scans every pull request, and every push to `dev` and `main`, with gitleaks.
- **Sessions:** the API sets httpOnly, Secure, SameSite cookies. Never store a token in localStorage, sessionStorage, Zustand or Context.
- **Validation:** validate every input with Zod on the client **and** on the server. Hiding a button is not authorization; the API is the authority.
- **Permissions:** every server action and route handler checks the session and the specific permission (for example `members.suspend`) before doing anything.
- **XSS:** no `dangerouslySetInnerHTML` (ESLint blocks it). If rich text is ever needed, sanitize it on the server.
- **Links and images:** links with `target="_blank"` get `rel="noopener noreferrer"`. Images load only from the hosts in `images.remotePatterns` (none yet).
- **Headers:** set centrally; a feature never weakens them (see below).
- **Errors and logs:** errors shown to users never include stack traces, tokens or other people's data. Never log passwords, tokens, cookies or full email addresses.
- **Privacy:** never reveal whether an email is registered (sign-in errors, forgot password, invitations).
- **Uploads:** check type and size on the client for UX; the server re-validates.
- **Dependencies:** a new dependency needs a reason in the pull request. CI's dependency review fails on known moderate or worse vulnerabilities.

## What the app already enforces

- **Proxy** (`src/proxy.ts`) runs before every page:
  - **No sign-in redirect yet.** App routes open without a session until the API's auth is wired; they show placeholders and no data ([ADR 0008](_docs/adr/0008-no-sign-in-gate-until-api-auth.md)). The redirect to `/sign-in?next=…` returns with sign-in, and the API stays the authority either way.
  - `safeNextPath` (`src/lib/security/safe-redirect.ts`) keeps `?next=` on this site, so sign-in can't be used as an open redirect.
- **Content-Security-Policy**, built in `src/lib/security/headers.ts`, with a new nonce per request:
  - `script-src 'self' 'nonce-…' 'strict-dynamic'`: only scripts carrying this request's nonce run. Next.js adds the nonce to its own scripts; use `useNonce()` for any other `<Script>`. Development adds `'unsafe-eval'`, which React needs for debug stacks.
  - `style-src 'self' 'unsafe-inline'`: a deliberate trade-off. Base UI positions popups with inline `style` attributes and sonner injects a `<style>` tag, and neither accepts a nonce. Scripts, where XSS does its damage, stay nonce-only.
  - `connect-src` allows only this app and the API origin. `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`; `upgrade-insecure-requests` in production.
  - Every page renders per request (the root layout reads the nonce), which a nonce-based CSP requires.
- **Other headers** on every response, static files included: `Strict-Transport-Security` (production), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that turns off camera, microphone, geolocation, payment, USB and topics. `X-Powered-By` is off.
- **Environment:** `.env.example` documents every variable. When one is missing the proxy falls back safely: no API origin in `connect-src`.
- **CI:** CodeQL (security-extended) on the app and the workflows, dependency review, and a gitleaks secret scan. Third-party actions are pinned to commit SHAs, and every workflow has least-privilege permissions.

A Playwright smoke test fails on any console error, which is how a CSP violation shows up, so a change that breaks the policy fails CI.
