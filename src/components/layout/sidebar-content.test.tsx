import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarContent } from './sidebar-content';
import { useViewingAsStore } from './viewing-as-store';

const pathname = vi.hoisted(() => ({ current: '/clans' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

const props = { clanId: 'rvnt', clanName: 'Revenant Syndicate' };

describe('SidebarContent', () => {
  beforeEach(() => {
    pathname.current = '/clans';
    useViewingAsStore.setState({ role: 'member' });
  });

  it('groups the navigation under its section labels', () => {
    render(<SidebarContent {...props} />);

    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(
      within(nav)
        .getAllByRole('heading')
        .map((heading) => heading.textContent),
    ).toEqual(['Public', 'Player', 'Clan — Revenant Syndicate', 'System']);
  });

  it('marks only the current page as active', () => {
    pathname.current = '/clans/rvnt/members';
    render(<SidebarContent {...props} />);

    const current = screen.getAllByRole('link').filter((link) => link.ariaCurrent === 'page');
    expect(current.map((link) => link.textContent)).toEqual(['Members']);
  });

  it('hides the clan directory item from the list', () => {
    render(<SidebarContent {...props} />);

    expect(screen.queryByRole('link', { name: 'Clan directory' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Clan profile' })).toBeInTheDocument();
  });

  it('shows counts next to their items', () => {
    render(<SidebarContent {...props} counts={{ members: 48, announcements: 3 }} />);

    expect(screen.getByRole('link', { name: 'Members,48' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Announcements,3' })).toBeInTheDocument();
  });

  it('hides the role switcher unless asked to show it', () => {
    const { rerender } = render(<SidebarContent {...props} />);
    expect(screen.queryByRole('group', { name: 'Viewing as' })).not.toBeInTheDocument();

    rerender(<SidebarContent {...props} showRoleSwitcher />);
    expect(screen.getByRole('group', { name: 'Viewing as' })).toBeInTheDocument();
  });

  it('adds the Admin group when viewing as an admin', () => {
    useViewingAsStore.setState({ role: 'admin' });
    render(<SidebarContent {...props} />);

    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/admin/users');
  });
});
