import type React from 'react';

/**
 * Split screen for the signed-out flows (D01–D08): a slanted green stripe panel on the left
 * and the page content on the right. Below 768px the panel is hidden and content fills the screen.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-bg md:flex-row">
      <aside
        aria-hidden="true"
        className="relative hidden w-5/12 shrink-0 border-r border-bd bg-stripes-banner md:block"
      >
        {/* Fades the stripes into the canvas colour towards the bottom, as in D01. */}
        <div className="absolute inset-0 bg-linear-to-b from-bg/30 via-bg/90 to-bg" />
      </aside>
      <main className="flex flex-1 flex-col justify-center gap-section px-gutter py-gutter">
        {children}
      </main>
    </div>
  );
}
