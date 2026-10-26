import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TabBar } from './tab-bar';

const meta = {
  title: 'Layout/TabBar',
  component: TabBar,
  args: { clanId: 'rvnt', notificationCount: 3 },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile' },
    nextjs: { appDirectory: true, navigation: { pathname: '/clans' } },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mobile (M18): Clans is the current tab; Alerts carries the unread count. */
export const Default: Story = {};

export const MyClanActive: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/clans/rvnt/rules' } } },
};
