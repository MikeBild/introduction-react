import type { Meta, StoryObj } from '@storybook/react-vite';

import { ToDoList } from './ToDoList';

const meta = {
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{
      "id": "iwehfoweif",
      "text": "Item1",
      "isChecked": true
    },
    {
      "id": "iwehfoweeeeif",
      "text": "Item2",
      "isChecked": false
    }]
  }
};

export const EmptytoDoList: Story = {
  args: {
    items: []
  }
};