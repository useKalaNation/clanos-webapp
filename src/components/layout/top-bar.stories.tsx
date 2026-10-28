import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TopBar } from './top-bar';

const meta = {
  title: 'Layout/TopBar',
  component: TopBar,
  args: {
    eyebrow: 'Public',
    title: 'Clan directory',
    user: { name: 'Rvnt_Kaze' },
    notificationCount: 3,
  },
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true, navigation: { pathname: '/clans' } },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop (D18): 72px bar with the bell and the player. */
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };

export const NoNotifications: Story = {
  args: { notificationCount: 0 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

/** Mobile (M18): 56px app bar with the drawer button; the bell is desktop only. */
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
