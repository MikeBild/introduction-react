import type { Meta, StoryObj } from '@storybook/react-vite';
import TodoInput from './TodoInput';

const meta: Meta<typeof TodoInput> = {
  component: TodoInput,
};

export default meta;

type Story = StoryObj<typeof TodoInput>;

export const Default: Story = {
  args: {
    onSave: (todo) => alert(`Saved: ${JSON.stringify(todo)}`),
    onCancel: () => alert('Cancelled'),
  },
};