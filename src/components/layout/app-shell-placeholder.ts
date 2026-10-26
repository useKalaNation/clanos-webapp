import type { NavCounts } from './nav-config';

/** Stands in for the session and API data the shell needs, until auth and the API exist. */
export const PLACEHOLDER_SHELL = {
  clanId: 'rvnt',
  clanName: 'Revenant Syndicate',
  user: { name: 'Rvnt_Kaze' },
  navCounts: { members: 48, announcements: 3 } satisfies NavCounts,
  notificationCount: 3,
} as const;
