import type { Meta, StoryObj } from '@storybook/react-vite';

import Layout from './Layout';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Layout {...args} />,
  args: {
    loggedInUser: 'Max Mustermann',
    setLoggedInUser: (user) => alert(user),
  },
}
