import { createContext, type ReactNode, useContext, useState } from "react";
import type { Todo, TodoList } from "./TodoList";

interface StoreProviderProps {
  children: ReactNode;
  todoList?: Todo[];
}

export interface Store {
  todoList: TodoList;
  isLoading: boolean;
  readTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => Promise<Todo>;
  removeTodo: (todo: Todo) => Promise<void>;
}

const StoreProviderContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children, todoList = [] }: StoreProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const value = {
    todoList: { todos },
    isLoading: false,
    readTodos: async () => {
      const response = await fetch("https://todo-api.mikebild.dev/todos");
      const data = await response.json();
      setTodos(data.map((x: any) => ({ text: x.title, done: x.completed })));
      return data;
    },
    addTodo: async (todo: Todo) => {
      const response = await fetch("https://todo-api.mikebild.dev/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: todo.text,
          completed: todo.done,
          important: todo.isImportant,
        }),
      });
      const data = await response.json();
      setTodos([...value.todoList.todos, todo]);
      return data;
    },
    removeTodo: async (todo: Todo) => {
      setTodos(value.todoList.todos.filter((x) => x.text !== todo.text));
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
