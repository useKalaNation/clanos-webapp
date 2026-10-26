import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppShell } from './app-shell';
import { useViewingAsStore } from './viewing-as-store';

const pathname = vi.hoisted(() => ({ current: '/clans' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

const props = { clanId: 'rvnt', clanName: 'Revenant Syndicate', user: { name: 'Rvnt_Kaze' } };

describe('AppShell', () => {
  beforeEach(() => {
    pathname.current = '/clans';
    useViewingAsStore.setState({ role: 'member' });
  });

  it('renders the page in the main landmark', () => {
    render(
      <AppShell {...props}>
        <p>Page content</p>
      </AppShell>,
    );

    expect(screen.getByRole('main')).toHaveTextContent('Page content');
  });

  it('takes the title and eyebrow from the active nav item and group', () => {
    pathname.current = '/clans/rvnt/members';
    render(<AppShell {...props}>Page</AppShell>);

    expect(screen.getByRole('heading', { level: 1, name: 'Members' })).toBeInTheDocument();
    expect(screen.getByText('Clan', { selector: 'p' })).toBeInTheDocument();
  });

<<<<<<< HEAD
=======
  it('still titles the clan directory page though its nav item is hidden', () => {
    render(<AppShell {...props}>Page</AppShell>);

    expect(screen.getByRole('heading', { level: 1, name: 'Clan directory' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Clan directory' })).not.toBeInTheDocument();
  });

>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
  it('lets a page override the title', () => {
    render(
      <AppShell {...props} title="Nightfall Order" eyebrow="Clan profile">
        Page
      </AppShell>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Nightfall Order' })).toBeInTheDocument();
  });

  it('falls back to the product name on a page outside the navigation', () => {
    pathname.current = '/somewhere-else';
    render(<AppShell {...props}>Page</AppShell>);

    expect(screen.getByRole('heading', { level: 1, name: 'CLANOS' })).toBeInTheDocument();
  });

  it('has the sidebar, top bar and tab bar landmarks', () => {
    render(<AppShell {...props}>Page</AppShell>);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Sidebar', { selector: 'aside' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Tabs' })).toBeInTheDocument();
  });
});
