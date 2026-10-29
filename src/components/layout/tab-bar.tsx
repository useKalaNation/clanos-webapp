'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { focusRing } from '@/lib/styles';
import { cn } from '@/lib/utils';

import { findActive, formatCount, getTabBarItems } from './nav-config';

interface TabBarProps {
  clanId: string;
  /** Unread notifications, shown on the Alerts tab. */
  notificationCount?: number;
}

/** Mobile bottom tab bar (M18): Home, Clans, My clan, Alerts and Me. Hidden from 768px up. */
export function TabBar({ clanId, notificationCount = 0 }: TabBarProps) {
  const pathname = usePathname();
  const items = getTabBarItems({ clanId });
  const active = findActive(items, pathname);

  return (
    <nav
      aria-label="Tabs"
      className="fixed inset-x-0 bottom-0 z-40 flex h-bottom-bar items-start border-t border-bd bg-s1 md:hidden"
    >
      {items.map((item) => {
        const isActive = item.id === active?.id;
        const showCount = item.id === 'alerts' && notificationCount > 0;
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex min-h-touch flex-1 flex-col items-center gap-sp-4 pt-sp-12 t-micro whitespace-nowrap transition-colors',
              focusRing,
              isActive ? 'text-brand' : 'text-mut',
            )}
          >
            <span className="relative">
              <item.icon aria-hidden="true" className="size-sp-20" />
              {showCount ? (
                <span
                  aria-label={`${formatCount(notificationCount)} unread`}
                  className="absolute top-0 left-full grid min-w-sp-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bad px-sp-4 t-count text-on-bad"
                >
                  {formatCount(notificationCount)}
                </span>
              ) : null}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
