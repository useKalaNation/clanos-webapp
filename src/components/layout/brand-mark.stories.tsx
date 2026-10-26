import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BrandMark } from './brand-mark';

const meta = {
  title: 'Layout/BrandMark',
  component: BrandMark,
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Logo tile, wordmark and tagline, as at the top of the sidebar (D18). */
export const Default: Story = {};
