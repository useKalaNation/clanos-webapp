import { SidebarContent, type SidebarContentProps } from './sidebar-content';

/** Desktop sidebar (D18). It sticks to the viewport; below 768px the NavDrawer replaces it. */
export function Sidebar(props: Omit<SidebarContentProps, 'onNavigate'>) {
  return (
    <aside
      aria-label="Sidebar"
      className="sticky top-0 hidden h-dvh w-side-panel shrink-0 overflow-y-auto border-r border-bd bg-s1 md:block"
    >
      <SidebarContent {...props} />
    </aside>
  );
}
