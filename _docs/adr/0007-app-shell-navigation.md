# 0007 · App shell navigation

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

Every signed-in screen needs the same frame: a sidebar and top bar on desktop (D18), an app bar, drawer and tab bar on mobile (M18, M43). Pages must not repeat it, the sidebar needs state that its distant neighbours share, and the navigation has items for several roles and some screens that don't exist yet.

## Decision

- **One `AppShell`** in the `(app)` layout. Pages render only their content; the title and eyebrow come from the active nav item, with props to override them.
- **Navigation is data**, not JSX: `getNavGroups` in `nav-config.ts` lists groups and items, with links from `ROUTES`. Items can be limited to roles, and an item without an `href` renders as a disabled "soon" row. The active item is the longest path match, so `/clans/rvnt/members` activates Members rather than Clan directory.
- **Two small Zustand stores** ([ADR 0002](0002-state-management.md)): `useDrawerStore` (mobile drawer open, set by the menu button, read by the drawer) and `useViewingAsStore` (the role the "Viewing as" switcher previews).
- **The role switcher is a preview.** It changes which items the navigation shows. It does not grant permissions; the API stays the authority (AGENTS.md section 7), and real roles come from the session once auth exists.
- **Mobile** uses the same sidebar content in a left sheet, plus a bottom tab bar of the five most-used destinations.

## Consequences

- A new screen needs a route and an entry in `nav-config.ts`, nothing else, to appear in the shell.
- Both the sidebar and the drawer render `SidebarContent`, so they never drift apart.
- Until auth and the API exist, the layout feeds the shell from `app-shell-placeholder.ts`; replacing it with the session and query data is a change to one file.
