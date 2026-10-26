import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { NavItem } from './nav-config';
import { SidebarNavItem } from './sidebar-nav-item';

const item: NavItem = { id: 'members', label: 'Members', href: '/clans/rvnt/members' };

describe('SidebarNavItem', () => {
  it('links to its route', () => {
    render(<SidebarNavItem item={item} />);

    const link = screen.getByRole('link', { name: 'Members' });
    expect(link).toHaveAttribute('href', '/clans/rvnt/members');
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('marks the active page for assistive tech', () => {
    render(<SidebarNavItem item={item} isActive />);

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('shows a count, including zero', () => {
    render(<SidebarNavItem item={item} count={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders an item without a route as a disabled "soon" row, not a link', () => {
    render(<SidebarNavItem item={{ id: 'foundations', label: 'Foundations & handoff' }} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Foundations & handoff')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Soon')).toBeInTheDocument();
  });

  it('reports navigation', async () => {
    const onNavigate = vi.fn();
    render(<SidebarNavItem item={item} onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole('link'));

    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
