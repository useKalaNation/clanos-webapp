'use client';

import { usePathname } from 'next/navigation';
import { useId } from 'react';

import { BrandMark } from './brand-mark';
import {
  findActive,
  getNavGroups,
  type NavCounts,
  type NavItem,
  visibleNavGroups,
} from './nav-config';
import { RoleSwitcher } from './role-switcher';
import { SidebarNavItem } from './sidebar-nav-item';
import { useViewingAsStore } from './viewing-as-store';

export interface SidebarContentProps {
  clanId: string;
  clanName: string;
  counts?: NavCounts;
  /** Shows the "Viewing as" role preview chips. Off by default; a developer aid only. */
  showRoleSwitcher?: boolean;
  /** Called after a link is chosen; the mobile drawer uses it to close itself. */
  onNavigate?: () => void;
}

/** Brand, role switcher and navigation groups: shared by the desktop sidebar and mobile drawer. */
export function SidebarContent({
  clanId,
  clanName,
  counts,
  showRoleSwitcher = false,
  onNavigate,
}: SidebarContentProps) {
  const idPrefix = useId();
  const pathname = usePathname();
  const role = useViewingAsStore((state) => state.role);

  const groups = visibleNavGroups(getNavGroups({ clanId, clanName }), role);
  const listed = groups
    .map((group) => ({ ...group, items: group.items.filter((item) => !item.hidden) }))
    .filter((group) => group.items.length > 0);
  const active = findActive<NavItem>(
    groups.flatMap((group) => group.items),
    pathname,
  );

  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-bd px-sp-16 py-sp-20">
        <BrandMark onNavigate={onNavigate} />
      </div>
      {showRoleSwitcher ? <RoleSwitcher className="border-b border-bd" /> : null}
      <nav aria-label="Main" className="flex flex-col gap-sp-20 px-sp-10 py-sp-16">
        {listed.map((group) => {
          const labelId = `${idPrefix}-${group.id}`;
          return (
            <section key={group.id} aria-labelledby={labelId} className="flex flex-col gap-sp-8">
              <h2 id={labelId} className="px-sp-6 t-label text-mut">
                {group.label}
              </h2>
              <ul className="flex flex-col gap-sp-4">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <SidebarNavItem
                      item={item}
                      isActive={item.id === active?.id}
                      count={counts?.[item.id]}
                      onNavigate={onNavigate}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </nav>
    </div>
  );
}
