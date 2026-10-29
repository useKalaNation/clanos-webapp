'use client';

import { BellIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

import { useDrawerStore } from './drawer-store';
import { formatCount } from './nav-config';

export interface TopBarUser {
  name: string;
  avatarUrl?: string;
}

interface TopBarProps {
  /** Small line above the title, e.g. the section name. */
  eyebrow?: string;
  title: string;
  user: TopBarUser;
  /** Unread notifications; the red badge is hidden at 0. */
  notificationCount?: number;
}

/**
 * Desktop top bar and mobile app bar (D18, M18): page title on the left, notifications
 * and the signed-in player on the right. On mobile it adds the drawer button.
 */
export function TopBar({ eyebrow, title, user, notificationCount = 0 }: TopBarProps) {
  const openDrawer = useDrawerStore((state) => state.open);
  const count = formatCount(notificationCount);

  return (
    <header className="sticky top-0 z-40 flex h-top-bar shrink-0 items-center gap-sp-12 border-b border-bd bg-s1 px-gutter">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        className="-ml-sp-12 md:hidden"
        onClick={openDrawer}
      >
        <MenuIcon />
      </Button>

      <div className="min-w-0 flex-1">
        {eyebrow ? <p className="t-data text-mut">{eyebrow}</p> : null}
        <h1 className="truncate t-h2 text-tx">{title}</h1>
      </div>

      <div className="flex items-center gap-sp-10">
        {/* The alerts screen is a mobile tab, so the bell button is desktop only. */}
        <Link
          href={ROUTES.alerts}
          aria-label={notificationCount > 0 ? `Notifications, ${count} unread` : 'Notifications'}
          className={cn(
            'relative hidden size-control-sm place-items-center rounded-md border border-bd bg-s2 text-mut transition-colors hover:text-tx md:grid',
            focusRing,
          )}
        >
          <BellIcon aria-hidden="true" className="size-sp-16" />
          {notificationCount > 0 ? (
            <span
              aria-hidden="true"
              className="absolute -top-sp-4 -right-sp-4 grid min-w-sp-16 place-items-center rounded-full bg-bad px-sp-4 t-count text-on-bad"
            >
              {count}
            </span>
          ) : null}
        </Link>
        <Link
          href={ROUTES.profile}
          aria-label={`Your profile, ${user.name}`}
          className={cn(
            'flex h-control-sm items-center gap-sp-8 rounded-full border border-bd bg-s2 p-sp-4 t-ui text-tx transition-colors hover:border-mut md:pr-sp-12',
            focusRing,
            touchTarget,
          )}
        >
          <Avatar size="sm" aria-hidden="true">
            {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
            <AvatarFallback />
          </Avatar>
          <span className="hidden md:inline">{user.name}</span>
        </Link>
      </div>
    </header>
  );
}
