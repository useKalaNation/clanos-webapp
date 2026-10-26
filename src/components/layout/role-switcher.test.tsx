import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { RoleSwitcher } from './role-switcher';
import { useViewingAsStore } from './viewing-as-store';

describe('RoleSwitcher', () => {
  beforeEach(() => {
    useViewingAsStore.setState({ role: 'member' });
  });

  it('offers every role and marks the current one as pressed', () => {
    render(<RoleSwitcher />);

    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'Member',
      'Staff',
      'Clan Master',
      'Admin',
    ]);
    expect(screen.getByRole('button', { name: 'Member' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Staff' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('stores the chosen role', async () => {
    render(<RoleSwitcher />);

    await userEvent.click(screen.getByRole('button', { name: 'Clan Master' }));

    expect(useViewingAsStore.getState().role).toBe('clan-master');
    expect(screen.getByRole('button', { name: 'Clan Master' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('labels the group for assistive tech', () => {
    render(<RoleSwitcher />);

    expect(screen.getByRole('group', { name: 'Viewing as' })).toBeInTheDocument();
  });
});
