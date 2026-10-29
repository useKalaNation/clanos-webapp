import { create } from 'zustand';

import type { Role } from './nav-config';

interface ViewingAsState {
  role: Role;
  setRole: (role: Role) => void;
}

/**
 * The role the sidebar's "Viewing as" switcher previews. It only changes what the navigation
 * shows; the API stays the authority on permissions (AGENTS.md section 7).
 */
export const useViewingAsStore = create<ViewingAsState>()((set) => ({
  role: 'member',
  setRole: (role) => {
    set({ role });
  },
}));
