import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDrawerStore } from './drawer-store';
import { TopBar } from './top-bar';

vi.mock('next/navigation', () => ({ usePathname: () => '/clans' }));

const user = { name: 'Rvnt_Kaze' };

describe('TopBar', () => {
  beforeEach(() => {
    useDrawerStore.setState({ isOpen: false });
  });

  it('shows the eyebrow and page title', () => {
    render(<TopBar eyebrow="Public" title="Clan directory" user={user} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Clan directory' })).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  it('shows the current route', () => {
    render(<TopBar title="Clan directory" user={user} />);

    expect(screen.getByText('/clans')).toBeInTheDocument();
  });

  it('links to notifications and announces the unread count', () => {
    render(<TopBar title="Clan directory" user={user} notificationCount={3} />);

    expect(screen.getByRole('link', { name: 'Notifications, 3 unread' })).toHaveAttribute(
      'href',
      '/alerts',
    );
  });

  it('has no badge when nothing is unread', () => {
    render(<TopBar title="Clan directory" user={user} />);

    expect(screen.getByRole('link', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('links the player to their profile', () => {
    render(<TopBar title="Clan directory" user={user} />);

    expect(screen.getByRole('link', { name: 'Your profile, Rvnt_Kaze' })).toHaveAttribute(
      'href',
      '/me',
    );
  });

  it('opens the mobile drawer through the store', async () => {
    render(<TopBar title="Clan directory" user={user} />);

    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));

    expect(useDrawerStore.getState().isOpen).toBe(true);
  });
});
