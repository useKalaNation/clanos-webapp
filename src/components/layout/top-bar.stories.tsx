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

<<<<<<< HEAD
/** Desktop (D18): 72px bar with the route, notifications and the player. */
=======
/** Desktop (D18): 72px bar with the bell and the player. */
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };

export const NoNotifications: Story = {
  args: { notificationCount: 0 },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

<<<<<<< HEAD
/** Mobile (M18): 56px app bar with the drawer button; the route and bell are desktop only. */
=======
/** Mobile (M18): 56px app bar with the drawer button; the bell is desktop only. */
>>>>>>> b875bb6 (feat(layout): add reusable app shell with sidebar and top bar)
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
