import { useActionState } from 'react';
import type { CreateTodo, Todo } from './todoApi';

type TodoListState = { todos: readonly Todo[]; error: string | null };

export const TodoList = ({ createTodo }: { createTodo: CreateTodo }) => {
  const addTodoAction = async (
    previousState: TodoListState,
    formData: FormData
  ): Promise<TodoListState> => {
    const title = String(formData.get('title') ?? '').trim();
    if (title.length < 3) return { ...previousState, error: 'Too short' };
    try {
      const savedTodo = await createTodo(title);
      return { todos: [...previousState.todos, savedTodo], error: null };
    } catch (error) {
      return { ...previousState, error: String(error) };
    }
  };

  const [todoListState, formAction, isPending] = useActionState(addTodoAction, {
    todos: [],
    error: null,
  });

  return (
    <>
      <form action={formAction}>
        <label htmlFor="title">New todo</label>
        <input id="title" name="title" />
        <button disabled={isPending}>{isPending ? 'Saving …' : 'Add'}</button>
      </form>
      {todoListState.error && <p role="alert">{todoListState.error}</p>}
      <ul>
        {todoListState.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
