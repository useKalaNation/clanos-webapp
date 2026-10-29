import Link from 'next/link';

import { focusRing } from '@/lib/styles';
import { cn } from '@/lib/utils';

import type { NavItem } from './nav-config';

interface SidebarNavItemProps {
  item: NavItem;
  isActive?: boolean;
  /** Notification-style number shown on the right, e.g. the member count. */
  count?: number;
  onNavigate?: () => void;
}

const rowClasses =
  'flex h-control-sm items-center justify-between gap-sp-8 rounded-md px-sp-10 t-body transition-colors';

/** One sidebar row: default, active, with a count, or "soon" when it has no screen yet. */
export function SidebarNavItem({ item, isActive = false, count, onNavigate }: SidebarNavItemProps) {
  if (item.href === undefined) {
    return (
      <span aria-disabled="true" className={cn(rowClasses, 'cursor-not-allowed text-mut')}>
        {item.label}
        <span className="rounded-xs border border-bd px-sp-4 py-sp-4 t-micro">Soon</span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        rowClasses,
        focusRing,
        isActive ? 'bg-s2 t-body-strong text-tx' : 'text-tx-2 hover:bg-s2 hover:text-tx',
      )}
    >
      {item.label}
      {count === undefined ? null : (
        <span className="t-micro text-mut">
          <span className="sr-only">, </span>
          {count}
        </span>
      )}
    </Link>
  );
}
