'use client';

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

import { useDrawerStore } from './drawer-store';
import { SidebarContent, type SidebarContentProps } from './sidebar-content';

/** Mobile navigation drawer (M43). The top bar's menu button opens it through useDrawerStore. */
export function NavDrawer(props: Omit<SidebarContentProps, 'onNavigate'>) {
  const isOpen = useDrawerStore((state) => state.isOpen);
  const setOpen = useDrawerStore((state) => state.setOpen);
  const close = useDrawerStore((state) => state.close);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="left" className="overflow-y-auto md:hidden">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Pages and your role view</SheetDescription>
        <SidebarContent {...props} onNavigate={close} />
      </SheetContent>
    </Sheet>
  );
}
