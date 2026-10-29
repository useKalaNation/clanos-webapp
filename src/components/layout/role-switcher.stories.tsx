import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';

import { RoleSwitcher } from './role-switcher';
import { useViewingAsStore } from './viewing-as-store';

const meta = {
  title: 'Layout/RoleSwitcher',
  component: RoleSwitcher,
  decorators: [
    (Story) => (
      <div className="w-side-panel border border-bd bg-s1">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    useViewingAsStore.setState({ role: 'member' });
  },
} satisfies Meta<typeof RoleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Member is selected; Admin sits on its own row. */
export const Default: Story = {};

/** Choosing a chip stores the role in useViewingAsStore. */
export const SwitchRole: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Staff' }));
    await expect(canvas.getByRole('button', { name: 'Staff' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  },
};
