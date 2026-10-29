import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchField } from './SearchField';

const meta = {
  title: 'Start/SearchField',
  component: SearchField,
  args: { label: 'Produkt suchen', value: '', onChange: fn() },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { value: 'Schlüssel' } };
