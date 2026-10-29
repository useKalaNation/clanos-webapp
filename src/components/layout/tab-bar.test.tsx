import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TabBar } from './tab-bar';

const pathname = vi.hoisted(() => ({ current: '/clans' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

describe('TabBar', () => {
  beforeEach(() => {
    pathname.current = '/clans';
  });

  it('has the five tabs in design order', () => {
    render(<TabBar clanId="rvnt" />);

    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Home',
      'Clans',
      'My clan',
      'Alerts',
      'Me',
    ]);
  });

  it('marks the current tab', () => {
    render(<TabBar clanId="rvnt" />);

    expect(screen.getByRole('link', { name: 'Clans' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('keeps My clan active on the clan’s own pages', () => {
    pathname.current = '/clans/rvnt/members';
    render(<TabBar clanId="rvnt" />);

    expect(screen.getByRole('link', { name: 'My clan' })).toHaveAttribute('aria-current', 'page');
  });

  it('puts the unread count on the Alerts tab', () => {
    render(<TabBar clanId="rvnt" notificationCount={3} />);

    expect(screen.getByLabelText('3 unread')).toBeInTheDocument();
  });

  it('is hidden from 768px up', () => {
    render(<TabBar clanId="rvnt" />);

    expect(screen.getByRole('navigation', { name: 'Tabs' })).toHaveClass('md:hidden');
  });
});
