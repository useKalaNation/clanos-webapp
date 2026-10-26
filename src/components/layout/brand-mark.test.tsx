import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BrandMark } from './brand-mark';

describe('BrandMark', () => {
  it('links to the dashboard with one accessible name', () => {
    render(<BrandMark />);

<<<<<<< HEAD
    expect(screen.getByRole('link', { name: /CLANOS\s*Clan operating system/u })).toHaveAttribute(
      'href',
      '/dashboard',
    );
=======
    expect(
      screen.getByRole('link', { name: 'CLANOS, Clan operating system. Go to dashboard' }),
    ).toHaveAttribute('href', '/dashboard');
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
  });

  it('reports navigation so the drawer can close', async () => {
    const onNavigate = vi.fn();
    render(<BrandMark onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole('link'));

    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
