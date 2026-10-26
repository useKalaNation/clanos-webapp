'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';

import {
  findActive,
  getNavGroups,
  type NavCounts,
  type NavItem,
  visibleNavGroups,
} from './nav-config';
import { NavDrawer } from './nav-drawer';
import { Sidebar } from './sidebar';
import { TabBar } from './tab-bar';
import { TopBar, type TopBarUser } from './top-bar';
import { useViewingAsStore } from './viewing-as-store';

interface AppShellProps {
  clanId: string;
  clanName: string;
  user: TopBarUser;
  navCounts?: NavCounts;
  notificationCount?: number;
  /** Shows the sidebar's "Viewing as" role preview. Off by default. */
  showRoleSwitcher?: boolean;
  /** Overrides the title taken from the active nav item, e.g. for a clan's own name. */
  title?: string;
  /** Overrides the eyebrow taken from the active nav group. */
  eyebrow?: string;
  children: React.ReactNode;
}

const FALLBACK_TITLE = 'CLANOS';

/**
 * The signed-in layout shared by every (app) screen: sidebar and top bar on desktop, app bar,
 * drawer and tab bar below 768px. The title follows the active nav item unless overridden.
 */
export function AppShell({
  clanId,
  clanName,
  user,
  navCounts,
  notificationCount,
  showRoleSwitcher,
  title,
  eyebrow,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const role = useViewingAsStore((state) => state.role);

  const groups = visibleNavGroups(getNavGroups({ clanId, clanName }), role);
  const active = findActive<NavItem>(
    groups.flatMap((group) => group.items),
    pathname,
  );
  const activeGroup = groups.find((group) => group.items.some((item) => item.id === active?.id));

  return (
    <div className="flex min-h-dvh bg-bg">
      <Sidebar
        clanId={clanId}
        clanName={clanName}
        counts={navCounts}
        showRoleSwitcher={showRoleSwitcher}
      />
      <NavDrawer
        clanId={clanId}
        clanName={clanName}
        counts={navCounts}
        showRoleSwitcher={showRoleSwitcher}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          eyebrow={eyebrow ?? activeGroup?.eyebrow}
          title={title ?? active?.label ?? FALLBACK_TITLE}
          user={user}
          notificationCount={notificationCount}
        />
        <main className="flex-1 px-gutter py-gutter">{children}</main>
        {/* Keeps the end of the page clear of the fixed tab bar; the token is 0 on desktop. */}
        <div aria-hidden="true" className="h-bottom-bar shrink-0" />
      </div>
      <TabBar clanId={clanId} notificationCount={notificationCount} />
    </div>
  );
}
