import { createContext, type ReactNode, useContext } from "react";
import type { Todo, TodoList } from "./TodoList";

interface StoreProviderProps {
  children: ReactNode;
}

export interface Store {
  todoList: TodoList;
}

const storeDefault: Store = { todoList: { todos: [] } };
const StoreProviderContext = createContext<Store>(storeDefault);

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <StoreProviderContext.Provider value={storeDefault}>
      {children}
    </StoreProviderContext.Provider>
  );
}

export function useStore(todos: Todo[] = []) {
  if (storeDefault.todoList.todos.length === 0 && todos.length !== 0)
    storeDefault.todoList.todos = [...storeDefault.todoList.todos, ...todos];

  return useContext(StoreProviderContext);
}
