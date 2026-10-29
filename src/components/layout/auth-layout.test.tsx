import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AuthLayout } from './auth-layout';

describe('AuthLayout', () => {
  it('renders its content in the main landmark', () => {
    render(
      <AuthLayout>
        <p>Form content</p>
      </AuthLayout>,
    );
    expect(screen.getByRole('main')).toHaveTextContent('Form content');
  });

  it('hides the decorative stripe panel from assistive tech and on mobile', () => {
    const { container } = render(
      <AuthLayout>
        <p>Content</p>
      </AuthLayout>,
    );
    const panel = container.querySelector('aside');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveClass('hidden', 'md:block');
  });
});
