import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AuthLayout } from './auth-layout';
import { ScreenPlaceholder } from './screen-placeholder';

const meta = {
  title: 'Layout/AuthLayout',
  component: AuthLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    children: <ScreenPlaceholder title="Sign in" screens={['D01', 'M01']} />,
  },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop: stripe panel on the left, content on the right. */
export const Desktop: Story = {};

/** Mobile: the stripe panel is hidden and the content fills the screen. */
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
