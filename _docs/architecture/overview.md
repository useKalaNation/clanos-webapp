# Architecture overview

CLANOS is a Next.js App Router app that talks to a **separate backend API**. This repository holds the web app only: no API routes or database.

```text
Browser ──▶ proxy.ts ──▶ Next.js (Server Components, per-request render) ──▶ HTML
   │            │
   │            └─ security headers, CSP nonce
   │
   └──────── HTTPS + session cookie ──▶ CLANOS API (separate backend)
```

## Routing

Routes live in `src/app`, grouped by who can see them. Groups don't change URLs.

| Group      | Who                                     | Routes                                                                                      |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `(auth)`   | Signed-out visitors                     | `/sign-in`, `/sign-up`, `/sign-up/verify`, `/forgot-password[/sent]`, `/reset-password/...` |
| `(public)` | Anyone with the link                    | `/invitations/[token]`                                                                      |
| `(app)`    | Signed-in players (open until API auth) | `/dashboard`, `/alerts`, `/me`, `/onboarding/...`, `/clans/...`, `/admin/users`             |

Every route in the [HANDOFF.md](../design/HANDOFF.md) screen inventory has a page. Until a screen is built, its page renders `ScreenPlaceholder` with the D##/M## frames to build it from, and a comment at the top names the screens. `src/lib/routes.ts` lists every route; build links from `ROUTES`, never by hand.

Pages stay thin: they read params and compose components from `src/features/<feature>/components` and `src/components`.

## Rendering

- **Server Components by default.** Add `'use client'` only where a component needs state, effects or browser APIs.
- **Every page renders per request.** The root layout reads the CSP nonce from the request, which opts out of static rendering; a nonce-based CSP needs a fresh nonce in every response. For the same reason Next's Cache Components / partial prerendering are off.
- **Errors:** `src/app/error.tsx` catches page errors, `global-error.tsx` catches a failing root layout, and `not-found.tsx` handles 404s. None of them show error details to users.

## Request flow and security

`src/proxy.ts` runs before every page (static assets excluded):

1. Generates a nonce and builds the Content-Security-Policy (`src/lib/security/headers.ts`).
2. Passes the nonce to the app in the `x-nonce` request header and sets the security headers on the response.

There's no sign-in redirect yet: app routes open without a session until the API's auth is wired ([ADR 0008](../adr/0008-no-sign-in-gate-until-api-auth.md)).

`next.config.ts` sets the same non-CSP headers on every response, static files included. [SECURITY.md](../../SECURITY.md) lists every header and the reasoning behind the CSP.

## Environment

Variables are read from `process.env` where they're needed and documented in `.env.example`. Today only the proxy reads one: `NEXT_PUBLIC_API_URL` (the API origin allowed in the CSP). `NEXT_PUBLIC_*` values are inlined into the build, so changing one means rebuilding; everything else stays on the server. There's no validation layer, by choice ([ADR 0001](../adr/0001-stack.md)).

## UI

- **Design tokens** (`src/styles/tokens.css`, generated) are the only source of visual values. `globals.css` maps them into Tailwind and turns everything else off; see [../design/README.md](../design/README.md).
- **Primitives** in `src/components/ui` are shadcn/ui components on Base UI, rewritten against the tokens and the D45/M45 variants. Dialogs become bottom sheets below 768px.
- **Fonts** come from `next/font` (`src/lib/fonts.ts`) and are set on `<html>`, where the token text styles pick them up.
- **Auth layout:** `src/app/(auth)/layout.tsx` wraps every signed-out route in `AuthLayout` (`src/components/layout/auth-layout.tsx`): the slanted green stripe panel (`bg-stripes-banner`, 5/12 width) on the left from 768px up, page content on the right. Pages render only their content.
- **Layout:** mobile-first. Base classes are the M frames (390px), and `md:` (768px) is the D frames (1440px). The app shell is described below.
<<<<<<< HEAD
- **App shell:** `src/app/(app)/layout.tsx` wraps every signed-in route in `AppShell` (`src/components/layout/app-shell.tsx`). From 768px up it is the 236px `Sidebar` (brand and grouped navigation, plus the optional "Viewing as" role switcher) beside a 72px `TopBar`. Below 768px the `TopBar` becomes the 56px app bar with a menu button that opens `NavDrawer` (the same navigation in a left sheet), and `TabBar` (Home, Clans, My clan, Alerts, Me) sits at the bottom; the main content leaves room for it with `--nav-bottom-bar`. The role switcher is a developer aid for previewing role-based navigation: it is hidden unless `showRoleSwitcher` is passed to `AppShell`. The page title and eyebrow follow the active nav item, and `AppShell` takes `title` and `eyebrow` props to override them. The navigation itself, its role rules and the active-item matching live in `src/components/layout/nav-config.ts`; links come from `ROUTES`. Until auth and the API exist, the layout passes the clan, user and counts from `app-shell-placeholder.ts`.
=======
- **App shell:** `src/app/(app)/layout.tsx` wraps every signed-in route in `AppShell` (`src/components/layout/app-shell.tsx`). From 768px up it is the 236px `Sidebar` (brand and grouped navigation, plus the optional "Viewing as" role switcher) beside a 72px `TopBar`. Below 768px the `TopBar` becomes the 56px app bar with a menu button that opens `NavDrawer` (the same navigation in a left sheet), and `TabBar` (Home, Clans, My clan, Alerts, Me) sits at the bottom; the main content leaves room for it with `--nav-bottom-bar`. The role switcher is a developer aid for previewing role-based navigation: it is hidden unless `showRoleSwitcher` is passed to `AppShell`. The page title and eyebrow follow the active nav item (an item marked `hidden`, like Clan directory, stays out of the sidebar but still names its page), and `AppShell` takes `title` and `eyebrow` props to override them. The navigation itself, its role rules and the active-item matching live in `src/components/layout/nav-config.ts`; links come from `ROUTES`. Until auth and the API exist, the layout passes the clan, user and counts from `app-shell-placeholder.ts`.
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)

## Features

New product code goes in `src/features/<feature>/`:

```text
features/clans/
  api/          API calls and query hooks
  components/   the feature's UI, each with a story and a test
  schemas/      Zod schemas for forms and API responses
  store.ts      Zustand store, only if the feature needs one
  index.ts      the feature's public API; other code imports only from here
```

ESLint stops one feature from importing another feature's internals, and stops anything but `src/lib/api/` from importing axios.

## State

[ADR 0002](../adr/0002-state-management.md) sets where state lives: server data in TanStack Query, shareable view state in the URL, shared UI state in Zustand (`src/components/layout/drawer-store.ts` for the mobile drawer and `viewing-as-store.ts` for the sidebar's "Viewing as" role), and everything else local. The API client (axios), TanStack Query and MSW mocks get added with the first feature that calls the API.

## Testing

| Layer      | Tool                                                                             | Where                                 |
| ---------- | -------------------------------------------------------------------------------- | ------------------------------------- |
| Unit       | Vitest + React Testing Library (jsdom)                                           | `*.test.ts(x)` next to the code       |
| Components | Storybook stories run as Vitest browser tests in Chromium, each checked with axe | `*.stories.tsx` next to the component |
| Scripts    | Vitest (Node)                                                                    | `scripts/*.test.ts`                   |
| End to end | Playwright at 1440px and 390px against a production build                        | `e2e/`                                |

Test behaviour, not implementation: query by role and label, and click like a user would.

## Quality gates

| Gate                                                       | Runs                                      |
| ---------------------------------------------------------- | ----------------------------------------- |
| ESLint, Prettier, token, comment, story checks             | pre-commit (staged files), CI             |
| Commit message (Conventional Commits)                      | commit-msg                                |
| Branch name, no pushes to `main`/`dev`, typecheck          | pre-push                                  |
| Everything + tests + build + Playwright                    | CI (`validate`), required to merge        |
| PR title, branch name, CodeQL, dependency review, gitleaks | CI, required to merge                     |
| Docs and stories keep up with the change (`check:docs`)    | CI (`docs`), required to merge into `dev` |
