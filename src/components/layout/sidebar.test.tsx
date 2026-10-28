import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Sidebar } from './sidebar';

vi.mock('next/navigation', () => ({ usePathname: () => '/dashboard' }));

describe('Sidebar', () => {
  it('is a landmark that is hidden below 768px', () => {
    render(<Sidebar clanId="rvnt" clanName="Revenant Syndicate" />);

    const sidebar = screen.getByLabelText('Sidebar', { selector: 'aside' });
    expect(sidebar).toHaveClass('hidden', 'md:block');
  });

  it('holds the navigation', () => {
    render(<Sidebar clanId="rvnt" clanName="Revenant Syndicate" />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
  });
});
