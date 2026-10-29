import type { Meta, StoryObj } from '@storybook/react-vite';

import ToDoListItem from './ToDoListItem';

const meta = {
  component: ToDoListItem,
} satisfies Meta<typeof ToDoListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemKey: "1",
    item: {text: "dkdkdkd", done: false, isImportant: true},
    onRemove: () => {},
    onCheckedToggle: () => {}
  }
};