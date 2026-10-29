'use client';

import { useId } from 'react';

import { focusRing, touchTarget } from '@/lib/styles';
import { cn } from '@/lib/utils';

import { type Role, ROLE_LABELS, ROLES } from './nav-config';
import { useViewingAsStore } from './viewing-as-store';

/** Roles that sit on a row of their own, stretched to the full width (Admin in D18). */
const FULL_ROW_ROLES: readonly Role[] = ['admin'];

/** "Viewing as" role chips in the sidebar. The chosen role lives in useViewingAsStore. */
export function RoleSwitcher({ className }: { className?: string }) {
  const labelId = useId();
  const role = useViewingAsStore((state) => state.role);
  const setRole = useViewingAsStore((state) => state.setRole);

  return (
    <section className={cn('flex flex-col gap-sp-8 px-sp-16 pt-sp-12 pb-sp-16', className)}>
      <h2 id={labelId} className="t-label text-mut">
        Viewing as
      </h2>
      <div role="group" aria-labelledby={labelId} className="flex flex-wrap gap-x-sp-4 gap-y-sp-6">
        {ROLES.map((value) => {
          const isSelected = value === role;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                setRole(value);
              }}
              className={cn(
                // TODO(token): design chips are 12px/600; t-ui is 13px, so padding is tightened.
                'rounded-md border px-sp-6 py-sp-6 t-ui whitespace-nowrap transition-colors',
                FULL_ROW_ROLES.includes(value) && 'basis-full',
                focusRing,
                touchTarget,
                isSelected
                  ? 'border-brand bg-brand text-on-brand'
                  : 'border-bd bg-transparent text-mut hover:bg-s2 hover:text-tx',
              )}
            >
              {ROLE_LABELS[value]}
            </button>
          );
        })}
      </div>
    </section>
  );
}
