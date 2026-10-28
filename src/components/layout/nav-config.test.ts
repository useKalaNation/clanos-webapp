import { describe, expect, it } from 'vitest';

import {
  findActive,
  formatCount,
  getNavGroups,
  getTabBarItems,
  type NavItem,
  visibleNavGroups,
} from './nav-config';

const context = { clanId: 'rvnt', clanName: 'Revenant Syndicate' };
const items = getNavGroups(context).flatMap((group) => group.items);

describe('findActive', () => {
  it('activates the item for the page', () => {
    expect(findActive<NavItem>(items, '/clans')?.id).toBe('clan-directory');
    expect(findActive<NavItem>(items, '/dashboard')?.id).toBe('dashboard');
  });

  it('prefers the most specific match over a parent route', () => {
    expect(findActive<NavItem>(items, '/clans/rvnt')?.id).toBe('my-clan');
    expect(findActive<NavItem>(items, '/clans/rvnt/members')?.id).toBe('members');
    expect(findActive<NavItem>(items, '/clans/new')?.id).toBe('clan-directory');
  });

  it('treats every onboarding step as Onboarding', () => {
    expect(findActive<NavItem>(items, '/onboarding/clans')?.id).toBe('onboarding');
  });

  it('does not match a path that only shares a prefix of letters', () => {
    expect(findActive<NavItem>(items, '/clansmen')).toBeUndefined();
  });

  it('never activates an item without a route', () => {
    expect(findActive<NavItem>(items, '/invitations/abc')).toBeUndefined();
  });
});

describe('hidden items', () => {
  it('stay matchable so the top bar can still name the page', () => {
    expect(items.find((item) => item.id === 'clan-directory')?.hidden).toBe(true);
    expect(findActive<NavItem>(items, '/clans')?.label).toBe('Clan directory');
  });
});

describe('visibleNavGroups', () => {
  it('hides the Admin group from everyone but admins', () => {
    const groups = getNavGroups(context);

    expect(visibleNavGroups(groups, 'member').map((group) => group.id)).not.toContain('admin');
    expect(visibleNavGroups(groups, 'admin').map((group) => group.id)).toContain('admin');
  });
});

describe('getNavGroups', () => {
  it('names the clan group after the clan and scopes its links to the clan id', () => {
    const clan = getNavGroups(context).find((group) => group.id === 'clan');

    expect(clan?.label).toBe('Clan — Revenant Syndicate');
    expect(clan?.items.map((item) => item.href)).toEqual([
      '/clans/rvnt',
      '/clans/rvnt/members',
      '/clans/rvnt/announcements',
      '/clans/rvnt/rules',
    ]);
  });
});

describe('getTabBarItems', () => {
  it('has the five mobile tabs in design order', () => {
    expect(getTabBarItems({ clanId: 'rvnt' }).map((tab) => tab.label)).toEqual([
      'Home',
      'Clans',
      'My clan',
      'Alerts',
      'Me',
    ]);
  });
});

describe('formatCount', () => {
  it('caps large counts', () => {
    expect(formatCount(3)).toBe('3');
    expect(formatCount(150)).toBe('99+');
  });
});
