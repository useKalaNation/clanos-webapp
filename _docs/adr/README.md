# Architecture decision records

An ADR records one decision: the situation, what was chosen, and what follows from it. When someone asks "why is it like this?", the answer should be here.

| ADR                                                                             | Decision                                                                          |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [0001 · Stack](0001-stack.md)                                                   | The tools and versions, and why each one                                          |
| [0002 · State management](0002-state-management.md)                             | Where each kind of state lives                                                    |
| [0003 · Branching](0003-branching.md)                                           | `dev` and `main`, squash merges into `dev`, release PRs to `main`                 |
| [0004 · Documentation is enforced](0004-documentation-is-enforced.md)           | Docs and stories ship with every change; CI checks it                             |
| [0005 · Admin bypass](0005-admin-bypass.md)                                     | Admins can merge a pull request without a review while the team has one reviewer  |
| [0006 · Manual dependency updates](0006-manual-dependency-updates.md)           | Upgrades are deliberate pull requests; no Dependabot version updates              |
| [0007 · App shell navigation](0007-app-shell-navigation.md)                     | One AppShell, navigation as data, role preview and drawer in small Zustand stores |
| [0008 · No sign-in gate until API auth](0008-no-sign-in-gate-until-api-auth.md) | App routes open without a session until the API's auth is wired                   |

## Writing one

1. Copy the template below to `NNNN-short-title.md`, using the next number.
2. Keep it to a page. Say what was decided, not how it's implemented.
3. Open it in its own `docs(adr): …` pull request, or in the pull request that makes the change.
4. Never rewrite an accepted ADR. To change a decision, write a new ADR that supersedes it, and set the old one's status to `Superseded by NNNN`.

```markdown
# NNNN · Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context

What's the situation, and what forces a decision?

## Decision

What we'll do.

## Consequences

What gets easier, what gets harder, and what we'll have to watch.
```
