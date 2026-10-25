import { useActionState, useOptimistic } from 'react';
import type { CreateTodo, Todo } from '../src/todoApi';
import { SubmitButton } from './SubmitButton';

type TodoListState = { todos: readonly Todo[]; error: string | null };

export const TodoList = ({ createTodo }: { createTodo: CreateTodo }) => {
  const addTodoAction = async (
    previousState: TodoListState,
    formData: FormData
  ): Promise<TodoListState> => {
    const title = String(formData.get('title') ?? '').trim();
    if (title.length < 3) return { ...previousState, error: 'Too short' };
    addOptimisticTodo({ id: crypto.randomUUID(), title, isPending: true });
    try {
      const savedTodo = await createTodo(title);
      return { todos: [...previousState.todos, savedTodo], error: null };
    } catch (error) {
      return { ...previousState, error: String(error) };
    }
  };

  const [todoListState, formAction] = useActionState(addTodoAction, {
    todos: [],
    error: null,
  });
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todoListState.todos,
    (currentTodos: readonly Todo[], newTodo: Todo) => [...currentTodos, newTodo]
  );

  return (
    <>
      <form action={formAction}>
        <label htmlFor="title">New todo</label>
        <input id="title" name="title" />
        <SubmitButton label="Add" />
      </form>
      {todoListState.error && <p role="alert">{todoListState.error}</p>}
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.isPending ? 0.5 : 1 }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};
