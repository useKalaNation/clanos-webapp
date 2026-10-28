import type { LucideIcon } from 'lucide-react';
import { BellIcon, HouseIcon, ShieldIcon, UserIcon, UsersIcon } from 'lucide-react';

import { ROUTES } from '@/lib/routes';

/** Who the shell is rendered for. The sidebar's "Viewing as" switcher picks one. */
export const ROLES = ['member', 'staff', 'clan-master', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS = {
  member: 'Member',
  staff: 'Staff',
  'clan-master': 'Clan Master',
  admin: 'Admin',
} as const satisfies Record<Role, string>;

export type NavItemId =
  | 'clan-directory'
  | 'clan-profile'
  | 'onboarding'
  | 'invitation-link'
  | 'dashboard'
  | 'profile'
  | 'my-clan'
  | 'members'
  | 'announcements'
  | 'rules'
  | 'foundations'
  | 'admin-users';

/** Live numbers shown next to a nav item, keyed by item id. */
export type NavCounts = Partial<Record<NavItemId, number>>;

/** Clan opened by the public "Clan profile" item (D20 shows Nightfall Order). */
const PROFILE_PREVIEW_CLAN_ID = 'nfo';

interface Matchable {
  href?: string;
  /** Path that marks the item active, when it differs from `href` (e.g. a whole flow). */
  activePrefix?: string;
}

export interface NavItem extends Matchable {
  id: NavItemId;
  label: string;
  /** Without an href the item has no screen yet and renders as a disabled "soon" item. */
  href?: string;
  roles?: readonly Role[];
}

export interface NavGroup {
  id: string;
  /** Section label in the sidebar. */
  label: string;
  /** Small line above the page title when one of this group's items is active. */
  eyebrow: string;
  items: readonly NavItem[];
  roles?: readonly Role[];
}

interface NavContext {
  clanId: string;
  clanName: string;
}

/** The sidebar and drawer navigation (D18, M43). Links come from ROUTES, never typed by hand. */
export function getNavGroups({ clanId, clanName }: NavContext): NavGroup[] {
  return [
    {
      id: 'public',
      label: 'Public',
      eyebrow: 'Public',
      items: [
        { id: 'clan-directory', label: 'Clan directory', href: ROUTES.clans },
        {
          id: 'clan-profile',
          label: 'Clan profile',
          href: ROUTES.clan(PROFILE_PREVIEW_CLAN_ID),
        },
        {
          id: 'onboarding',
          label: 'Onboarding',
          href: ROUTES.onboardingGame,
          activePrefix: '/onboarding',
        },
        { id: 'invitation-link', label: 'Invitation link' },
      ],
    },
    {
      id: 'player',
      label: 'Player',
      eyebrow: 'Player',
      items: [
        { id: 'dashboard', label: 'Dashboard', href: ROUTES.dashboard },
        { id: 'profile', label: 'Profile & game IDs', href: ROUTES.profile },
      ],
    },
    {
      id: 'clan',
      label: `Clan — ${clanName}`,
      eyebrow: 'Clan',
      items: [
        { id: 'my-clan', label: 'My clan', href: ROUTES.clan(clanId) },
        { id: 'members', label: 'Members', href: ROUTES.clanMembers(clanId) },
        { id: 'announcements', label: 'Announcements', href: ROUTES.clanAnnouncements(clanId) },
        { id: 'rules', label: 'Rules', href: ROUTES.clanRules(clanId) },
      ],
    },
    {
      id: 'admin',
      label: 'Admin',
      eyebrow: 'Admin',
      roles: ['admin'],
      items: [{ id: 'admin-users', label: 'Users', href: ROUTES.adminUsers }],
    },
    {
      id: 'system',
      label: 'System',
      eyebrow: 'System',
      items: [{ id: 'foundations', label: 'Foundations & handoff' }],
    },
  ];
}

/** Drops the groups and items a role doesn't see, and groups left empty. */
export function visibleNavGroups(groups: readonly NavGroup[], role: Role): NavGroup[] {
  const canSee = (roles?: readonly Role[]) => !roles || roles.includes(role);
  return groups
    .filter((group) => canSee(group.roles))
    .map((group) => ({ ...group, items: group.items.filter((item) => canSee(item.roles)) }))
    .filter((group) => group.items.length > 0);
}

function isPathUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * The item whose path is the longest match for the current page, so `/clans/rvnt/members`
 * activates Members rather than Clan directory. Ties go to the earlier item.
 */
export function findActive<T extends Matchable>(
  items: readonly T[],
  pathname: string,
): T | undefined {
  let best: T | undefined;
  let bestLength = -1;
  for (const item of items) {
    const prefix = item.activePrefix ?? item.href;
    if (prefix === undefined || !isPathUnder(pathname, prefix)) continue;
    if (prefix.length > bestLength) {
      best = item;
      bestLength = prefix.length;
    }
  }
  return best;
}

export interface TabBarItem extends Matchable {
  id: 'home' | 'clans' | 'my-clan' | 'alerts' | 'me';
  label: string;
  href: string;
  icon: LucideIcon;
}

/** The mobile tab bar (M18): Home, Clans, My clan, Alerts and Me. The drawer holds the rest. */
export function getTabBarItems({ clanId }: Pick<NavContext, 'clanId'>): TabBarItem[] {
  return [
    { id: 'home', label: 'Home', href: ROUTES.dashboard, icon: HouseIcon },
    { id: 'clans', label: 'Clans', href: ROUTES.clans, icon: ShieldIcon },
    { id: 'my-clan', label: 'My clan', href: ROUTES.clan(clanId), icon: UsersIcon },
    { id: 'alerts', label: 'Alerts', href: ROUTES.alerts, icon: BellIcon },
    { id: 'me', label: 'Me', href: ROUTES.profile, icon: UserIcon },
  ];
}

const MAX_COUNT = 99;

/** Notification count as shown in a badge: capped so it never outgrows the badge. */
export function formatCount(count: number): string {
  return count > MAX_COUNT ? `${String(MAX_COUNT)}+` : String(count);
}
