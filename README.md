# CLANOS

CLANOS ("Clan Operating System") is a web app for running gaming clans, starting with Call of Duty: Mobile: members, recruitment, invitations, staff roles, teams, rules and announcements.

This repository is the **web app scaffold**: Next.js, the CLANOS design system, the quality gates and the team workflow. Every screen in the design has a route with a placeholder; developers build the screens from there. The API is a separate backend.

## Quick start

You need **pnpm 12** (`brew install pnpm`, or `npm install -g pnpm`). pnpm reads the versions pinned in `package.json` and downloads the right Node.js (24.22.1 LTS) for this project by itself.

```sh
pnpm install                     # also installs the Git hooks
cp .env.example .env.local       # then adjust the values if you need to
pnpm dev                         # starts on localhost:3000
```

- `/` redirects to the dashboard. Every route opens without signing in until the API's auth is wired ([ADR 0008](_docs/adr/0008-no-sign-in-gate-until-api-auth.md)).
- `pnpm storybook` opens the component docs on port 6006: every UI component in every variant, with its props and an accessibility check.

## Scripts

| Script                         | What it does                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                     | Starts the dev server.                                                                                                |
| `pnpm build`                   | Builds for production. `pnpm start` serves the build.                                                                 |
| `pnpm lint` / `lint:fix`       | ESLint, with no warnings allowed / with fixes applied.                                                                |
| `pnpm format` / `format:check` | Prettier, writing / checking.                                                                                         |
| `pnpm typecheck`               | Generates Next's route types, then runs `tsc`.                                                                        |
| `pnpm test`                    | Vitest: unit tests in jsdom, script tests in Node, and every Storybook story in Chromium with an accessibility check. |
| `pnpm test:watch`              | Vitest in watch mode.                                                                                                 |
| `pnpm test:e2e`                | Playwright at 1440px and 390px.                                                                                       |
| `pnpm storybook`               | Storybook dev server. `build-storybook` builds the static site.                                                       |
| `pnpm check:tokens`            | Fails on raw colours, sizes, fonts or Tailwind arbitrary values.                                                      |
| `pnpm check:comments`          | Fails on comments over 3 lines and TODOs without an issue number.                                                     |
| `pnpm check:stories`           | Fails when a component has no story or no test.                                                                       |
| `pnpm check:docs`              | Fails when architecture changed without docs, or a component without its story (compared with `origin/dev`).          |
| `pnpm validate`                | Everything above except Playwright, then a production build. Run it before you open a pull request.                   |

## Folder structure

```text
_docs/                  architecture, decisions (ADRs), design reference, guides
.github/                CI workflows, PR template, CODEOWNERS
.storybook/             Storybook config
e2e/                    Playwright tests
scripts/                the check scripts and the GitHub setup script
src/
  app/                  routes only: (auth), (public) and (app) route groups; pages stay thin
  components/ui/        token-based shadcn/ui primitives, each with a story and a test
  components/layout/    layout pieces (the app shell goes here)
  features/<feature>/   a feature's api/, components/, schemas/ and store, exported through index.ts
  lib/                  utilities, routes, security helpers, fonts, providers
  styles/tokens.css     the design tokens; generated, never edited by hand
  proxy.ts              security headers (and the sign-in redirect, once API auth is wired)
```

`AGENTS.md` is the rulebook for this codebase, for people and coding agents alike. Read it before your first change.

## Design tokens

Every colour, font, type size, space, radius and layout size comes from `src/styles/tokens.css`, which the CLANOS design package generates. `src/app/globals.css` maps the tokens into Tailwind and switches Tailwind's own palette, type scale, radii and numeric spacing off, so only token-based classes exist:

```tsx
<div className="rounded-lg border border-bd bg-s1 p-card">
  <h2 className="t-h3">Nightfall Order</h2>
  <p className="t-body text-tx-2">Disciplined MP clan.</p>
</div>
```

- Colours: `bg-s1`, `text-mut`, `border-bd`, `text-brand`, `text-bad` …
- Text styles: `t-display`, `t-h1` … `t-micro`. Use these instead of setting size, weight or family.
- Space: `p-sp-16`, `gap-sp-8`; layout: `px-gutter`, `gap-section`, `h-control`, `w-side-panel`.
- Radius: `rounded-xs` … `rounded-xl`, `rounded-full`.

Layout and type tokens switch below 768px, Tailwind's `md` breakpoint. Build mobile-first: base classes are the mobile (M) design and `md:` is the desktop (D) design. When a value has no token, use the closest one and mark it `TODO(token): …`; [CONTRIBUTING.md](CONTRIBUTING.md#requesting-a-design-token) explains how to request a new token.

## Documentation

- [AGENTS.md](AGENTS.md): the rules every change follows
- [CONTRIBUTING.md](CONTRIBUTING.md): branches, commits, pull requests and reviews
- [SECURITY.md](SECURITY.md): reporting a vulnerability, and the security rules
- [\_docs/](_docs/README.md): architecture, decisions, design reference and guides
- [Figma file](https://www.figma.com/design/VaNvrVo01bCgLfUnnF1Fvd/CLANOS)
