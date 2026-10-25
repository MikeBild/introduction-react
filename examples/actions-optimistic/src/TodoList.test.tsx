import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import type { Todo } from './todoApi';
import { TodoList } from './TodoList';

const addTodo = async (title: string) => {
  await userEvent.type(screen.getByLabelText('New todo'), title);
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
};

it('rejects short titles without calling the server', async () => {
  render(<TodoList createTodo={() => Promise.reject('unexpected call')} />);
  await addTodo('ab');
  expect(await screen.findByRole('alert')).toHaveTextContent('Too short');
});

it('shows the todo after the server saved it', async () => {
  render(
    <TodoList createTodo={(title) => Promise.resolve({ id: '1', title })} />
  );
  await addTodo('Buy milk');
  expect(await screen.findByRole('listitem')).toHaveTextContent('Buy milk');
});

// Exercise: remove .skip
it.skip('shows the todo immediately while the server is still saving', async () => {
  const { promise: savedTodo, resolve: resolveSavedTodo } =
    Promise.withResolvers<Todo>();
  render(<TodoList createTodo={() => savedTodo} />);
  await addTodo('Buy milk');
  expect(await screen.findByRole('listitem')).toHaveTextContent('Buy milk');
  resolveSavedTodo({ id: '1', title: 'Buy milk' });
});

it.skip('removes the optimistic todo when saving fails', async () => {
  render(<TodoList createTodo={() => Promise.reject('Server down')} />);
  await addTodo('Buy milk');
  expect(await screen.findByRole('alert')).toHaveTextContent('Server down');
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});
