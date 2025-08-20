import { createContext, type ReactNode, useContext, useState } from "react";
import type { Todo, TodoList } from "./TodoList";

interface StoreProviderProps {
  children: ReactNode;
  todoList?: Todo[];
}

export interface Store {
  todoList: TodoList;
  isLoading: boolean;
  error: string | undefined;
  readTodos: (ac?: AbortController) => Promise<Todo[]>;
  addTodo: (todo: Todo) => Promise<Todo>;
  removeTodo: (todo: Todo) => Promise<void>;
}

const StoreProviderContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children, todoList = [] }: StoreProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const value = {
    todoList: { todos },
    isLoading,
    error,
    readTodos: async (ac?: AbortController) => {
      setError(undefined);
      setIsLoading(true);
      try {
        const response = await fetch("https://todo-api.mikebild.dev/todos", {
          signal: ac?.signal,
        });
        const data = await response.json();
        setTodos(
          data.map((x: any) => ({ id: x.id, text: x.title, done: x.completed }))
        );
        return data;
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }

      return [];
    },
    addTodo: async (todo: Todo) => {
      setError(undefined);
      setIsLoading(true);
      try {
        const response = await fetch("https://todo-api.mikebild.dev/todos", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: todo.id,
            title: todo.text,
            completed: todo.done,
            important: todo.isImportant,
          }),
        });
        if (response.status !== 201) throw new Error(`Can not add Todo`);

        setTodos([...value.todoList.todos, todo]);

        const data = await response.json();
        return data;
      } catch (error: any) {
        setError(error.message);
        return {};
      } finally {
        setIsLoading(false);
      }
    },
    removeTodo: async (todo: Todo) => {
      if (!todo.id) throw new Error(`ID in Todo not found`);

      setError(undefined);
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://todo-api.mikebild.dev/todos/${todo.id}`,
          {
            method: "DELETE",
          }
        );
        await response.json();
        setTodos(value.todoList.todos.filter((x) => x.id !== todo.id));
      } catch (error: any) {
        setError(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <StoreProviderContext.Provider value={value}>
      {children}
    </StoreProviderContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreProviderContext);
}
