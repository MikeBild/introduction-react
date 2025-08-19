import type { Meta, StoryObj } from '@storybook/react-vite';

import ToDoList from './MyToDoList';

const meta = {
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    todoList: {todos: []}
  }
};

export const WithTodos: Story = {
  args: {
    todoList: {todos: [
      {"done": true, "text": "Item1"},
      {"done": false, "text": "Item2"},
    ]}
  }
};