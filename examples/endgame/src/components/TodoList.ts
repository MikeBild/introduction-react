export interface Todo {
  text?: string;
  done?: boolean;
  isImportant?: boolean;
}

export interface TodoList {
  todos: Todo[];
}
