import type { ToDoListItemEntry } from "../model/ToDoListItemEntry"


interface ToDoListItemProps{
    item: ToDoListItemEntry;
    onRemove: (id: string) => void;
    onCheckedToggle: (id: string) => void;
}

export function ToDoListItem({item, onRemove, onCheckedToggle}: ToDoListItemProps){
    return (
        <li>
            <input type="checkbox" checked={item.isChecked} onChange={ () => onCheckedToggle(item.id)} />
            {item.text}
            <button onClick={ () => onRemove(item.id) }>Remove</button>
        </li>
    )
}