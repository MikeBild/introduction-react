export interface TodoListProps {
  items: { desc: string; state: "open" | "closed"; id: string }[];
}

export function TodoList(items: TodoListProps) {
  return <></>;
}
