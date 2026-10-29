import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AppShell } from './app-shell';
import { PLACEHOLDER_SHELL } from './app-shell-placeholder';
import { ScreenPlaceholder } from './screen-placeholder';

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  args: {
    ...PLACEHOLDER_SHELL,
    children: <ScreenPlaceholder title="Clan directory" screens={['D18', 'M18', 'M19']} />,
  },
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true, navigation: { pathname: '/clans' } },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop (D18): sidebar on the left, top bar and page on the right. */
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };

/** Mobile (M18): app bar with the drawer button and the bottom tab bar. */
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };

/** A page can set its own title, e.g. a clan's name. */
export const CustomTitle: Story = {
  args: { title: 'Nightfall Order', eyebrow: 'Clan profile' },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
