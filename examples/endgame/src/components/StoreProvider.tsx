import { createContext, type ReactNode, useContext, useState } from "react";
import type { Todo, TodoList } from "./TodoList";

interface StoreProviderProps {
  children: ReactNode;
  todoList?: Todo[];
}

export interface Store {
  todoList: TodoList;
  addTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
}

const StoreProviderContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children, todoList = [] }: StoreProviderProps) {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const value = {
    todoList: { todos },
    addTodo: (todo: Todo) => {
      setTodos([...value.todoList.todos, todo]);
    },
    removeTodo: (todo: Todo) => {
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
