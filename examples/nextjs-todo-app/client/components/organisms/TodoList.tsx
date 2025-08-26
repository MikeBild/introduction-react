import { TodoItem } from "../moleculs/TodoItem";

export interface TodoListProps {
  items: { desc: string; state: "open" | "closed"; id: string }[];
}

export function TodoList(props: TodoListProps) {
  return (
    <ul data-testid="TodoList-ul">
      {props.items.map((item, idx) => (
        <li key={idx}>
          <TodoItem item={item} />
        </li>
      ))}
    </ul>
  );
}
