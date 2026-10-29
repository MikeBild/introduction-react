export interface Todo {
  id: string;
  text?: string;
  done?: boolean;
  isImportant?: boolean;
}

export interface TodoList {
  todos?: Todo[];
}
