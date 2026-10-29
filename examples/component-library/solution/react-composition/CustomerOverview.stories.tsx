import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { customers } from '../../src/data/customers';
import { CustomerOverview } from './CustomerOverview';

const meta = {
  title: 'Composition/CustomerOverview',
  component: CustomerOverview,
  args: { customers, onEdit: fn() },
} satisfies Meta<typeof CustomerOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { customers: [] } };
