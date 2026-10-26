import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { NavItem } from './nav-config';
import { SidebarNavItem } from './sidebar-nav-item';

const item: NavItem = { id: 'members', label: 'Members', href: '/clans/rvnt/members' };

const meta = {
  title: 'Layout/SidebarNavItem',
  component: SidebarNavItem,
  args: { item },
  decorators: [
    (Story) => (
      <div className="w-side-panel border border-bd bg-s1 p-sp-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The page you are on: raised background, stronger text, aria-current. */
export const Active: Story = { args: { isActive: true } };

export const WithCount: Story = { args: { count: 48 } };

/** No screen yet: a disabled row with a SOON tag. */
export const Soon: Story = {
  args: { item: { id: 'foundations', label: 'Foundations & handoff' } },
};
