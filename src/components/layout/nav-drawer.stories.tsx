import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { useDrawerStore } from './drawer-store';
import { NavDrawer } from './nav-drawer';

const meta = {
  title: 'Layout/NavDrawer',
  component: NavDrawer,
  args: {
    clanId: 'rvnt',
    clanName: 'Revenant Syndicate',
    counts: { members: 48, announcements: 3 },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile' },
    nextjs: { appDirectory: true, navigation: { pathname: '/clans' } },
  },
  beforeEach: () => {
    useDrawerStore.setState({ isOpen: true });
    return () => {
      useDrawerStore.setState({ isOpen: false });
    };
  },
} satisfies Meta<typeof NavDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mobile (M43): the sidebar content in a left drawer, opened from the app bar's menu button. */
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    await expect(body.querySelector('[role="dialog"]')).not.toBeNull();
  },
};
