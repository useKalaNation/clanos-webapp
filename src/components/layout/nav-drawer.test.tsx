import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDrawerStore } from './drawer-store';
import { NavDrawer } from './nav-drawer';

vi.mock('next/navigation', () => ({ usePathname: () => '/clans' }));

const props = { clanId: 'rvnt', clanName: 'Revenant Syndicate' };

describe('NavDrawer', () => {
  beforeEach(() => {
    useDrawerStore.setState({ isOpen: false });
  });

  it('is closed until the store opens it', async () => {
    render(<NavDrawer {...props} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    act(() => {
      useDrawerStore.getState().open();
    });

    expect(await screen.findByRole('dialog', { name: 'Navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('closes when a link is chosen', async () => {
    useDrawerStore.setState({ isOpen: true });
    render(<NavDrawer {...props} />);

    await userEvent.click(await screen.findByRole('link', { name: 'Dashboard' }));

    expect(useDrawerStore.getState().isOpen).toBe(false);
  });

  it('closes with the close button', async () => {
    useDrawerStore.setState({ isOpen: true });
    render(<NavDrawer {...props} />);

    await userEvent.click(await screen.findByRole('button', { name: 'Close' }));

    expect(useDrawerStore.getState().isOpen).toBe(false);
  });
});
