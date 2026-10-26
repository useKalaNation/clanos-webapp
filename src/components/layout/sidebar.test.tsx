import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Sidebar } from './sidebar';

<<<<<<< HEAD
vi.mock('next/navigation', () => ({ usePathname: () => '/clans' }));
=======
vi.mock('next/navigation', () => ({ usePathname: () => '/dashboard' }));
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)

describe('Sidebar', () => {
  it('is a landmark that is hidden below 768px', () => {
    render(<Sidebar clanId="rvnt" clanName="Revenant Syndicate" />);

    const sidebar = screen.getByLabelText('Sidebar', { selector: 'aside' });
    expect(sidebar).toHaveClass('hidden', 'md:block');
  });

  it('holds the navigation', () => {
    render(<Sidebar clanId="rvnt" clanName="Revenant Syndicate" />);

<<<<<<< HEAD
    expect(screen.getByRole('link', { name: 'Clan directory' })).toHaveAttribute(
      'aria-current',
      'page',
    );
=======
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
  });
});
