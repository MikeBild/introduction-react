import type { Meta, StoryObj } from '@storybook/react-vite';

import LoginScreen from './LoginScreen';

const meta = {
  component: LoginScreen,
} satisfies Meta<typeof LoginScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};