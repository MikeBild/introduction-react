import type { Meta, StoryObj } from '@storybook/react-vite';

import LoginSignupScreen from './SignupScreen';

const meta = {
  component: LoginSignupScreen,
} satisfies Meta<typeof LoginSignupScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};