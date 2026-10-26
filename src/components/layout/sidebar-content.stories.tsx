import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SidebarContent } from './sidebar-content';
import { useViewingAsStore } from './viewing-as-store';

const meta = {
  title: 'Layout/SidebarContent',
  component: SidebarContent,
  args: {
    clanId: 'rvnt',
    clanName: 'Revenant Syndicate',
    counts: { members: 48, announcements: 3 },
  },
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/clans' } } },
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
} satisfies Meta<typeof SidebarContent>;

export default meta;
type Story = StoryObj<typeof meta>;

<<<<<<< HEAD
/** D18: Clan directory is active. */
=======
/** On the clan directory the item is hidden, so nothing in the list is highlighted. */
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
export const Default: Story = {};

export const ClanPageActive: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/clans/rvnt/members' } } },
};

/** Role preview chips, for exploring role-based navigation. Hidden by default. */
export const WithRoleSwitcher: Story = { args: { showRoleSwitcher: true } };

/** Admins also see the Admin group. */
export const ViewingAsAdmin: Story = {
  args: { showRoleSwitcher: true },
  beforeEach: () => {
    useViewingAsStore.setState({ role: 'admin' });
  },
};
