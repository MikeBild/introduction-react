import type { Todo } from "./TodoList";


interface ToDoListItemProps{
    item: Todo;
    onRemove: (item: Todo) => void;
    onCheckedToggle: (todoList: Todo) => void;
}

export default function ToDoListItem({item, onRemove, onCheckedToggle: onDoneToggle}: ToDoListItemProps){
    return (
        <li>
            <input type="checkbox" checked={item.done} onChange={ () => onDoneToggle(item)} />
            {item.text}
            <button onClick={ () => onRemove(item) }>Remove</button>
        </li>
    )
}