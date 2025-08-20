import ToDoListItem from "./ToDoListItem";
import type { Todo, TodoList } from "./TodoList";
import "./MyToDoList.css";

interface ToDoListProps {
  todoList?: TodoList;
  onItemRemoved: (item: Todo) => void;
  onItemDoneToggle: (item: Todo) => void;
}

export default function ToDoList({
  todoList = { todos: [] },
  onItemRemoved,
  onItemDoneToggle: onItemCheckedToggle,
}: ToDoListProps) {
  if (todoList.todos?.length == 0) {
    return <p style={{ color: "black" }}>Hurray! There are no more to do's.</p>;
  }
  return (
    <ul>
      {todoList.todos?.map((item, i) => (
        <ToDoListItem
          key={i.toString()}
          onRemove={(item) => {
            onItemRemoved(item);
          }}
          onCheckedToggle={(item) => {
            onItemCheckedToggle(item);
          }}
          item={item}
        ></ToDoListItem>
      ))}
    </ul>
  );
}
