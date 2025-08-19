import type { Todo } from "./TodoList";

interface ToDoListItemProps {
  item: Todo;
  itemKey: string;
  onRemove: (item: Todo) => void;
  onCheckedToggle: (todoList: Todo) => void;
}

export default function ToDoListItem({
  item,
  itemKey,
  onRemove,
  onCheckedToggle: onDoneToggle,
}: ToDoListItemProps) {
  return (
    <li key={itemKey}>
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onDoneToggle(item)}
      />
      {item.text}
      <button onClick={() => onRemove(item)}>Remove</button>
    </li>
  );
}
