import type { Meta, StoryObj } from '@storybook/react-vite';

import ToDoList from './MyToDoList';
import type { Todo } from './TodoList';

const meta = {
  component: ToDoList,
} satisfies Meta<typeof ToDoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    todoList: {todos: []},
    onItemRemoved: (item: Todo) => {alert(`Removed Item ${item.text}`)},
    onItemDoneToggle: (item: Todo) => {alert(`Toggled "done" for item ${item.text}`)}
  }
};

export const WithTodos: Story = {
  args: {
    todoList: {todos: [
      {"done": true, "text": "Item1"},
      {"done": false, "text": "Item2"},
    ]},
    onItemRemoved: (item: Todo) => {alert(`Removed item ${item.text}`)},
    onItemDoneToggle: (item: Todo) => {alert(`Toggled "done" for item ${item.text}`)}
  }
};