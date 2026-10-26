import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Sidebar } from './sidebar';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  args: {
    clanId: 'rvnt',
    clanName: 'Revenant Syndicate',
    counts: { members: 48, announcements: 3 },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
    nextjs: { appDirectory: true, navigation: { pathname: '/clans' } },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop (D18): 236px panel with the role switcher and grouped navigation. */
export const Desktop: Story = {};
