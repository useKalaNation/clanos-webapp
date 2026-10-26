import Link from 'next/link';

import { ROUTES } from '@/lib/routes';
import { focusRing } from '@/lib/styles';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  onNavigate?: () => void;
  className?: string;
}

/** The CLANOS logo and wordmark at the top of the sidebar; it links home. */
export function BrandMark({ onNavigate, className }: BrandMarkProps) {
  return (
    <Link
      href={ROUTES.dashboard}
      onClick={onNavigate}
<<<<<<< HEAD
=======
      aria-label="CLANOS, Clan operating system. Go to dashboard"
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
      className={cn('flex items-center gap-sp-10 rounded-md', focusRing, className)}
    >
      <span
        aria-hidden="true"
        className="grid size-sp-28 shrink-0 place-items-center rounded-md bg-brand t-wordmark text-on-brand"
      >
        C
      </span>
<<<<<<< HEAD
      <span className="flex flex-col">
=======
      <span aria-hidden="true" className="flex flex-col">
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
        <span className="t-wordmark text-tx">CLANOS</span>
        <span className="t-label text-mut">Clan operating system</span>
      </span>
    </Link>
  );
}
