import type { ToDoListItemEntry } from "../model/ToDoListItemEntry";
import { ToDoListItem} from "./ToDoListItem";

interface ToDoListProps {
    items: ToDoListItemEntry[];
}

export function ToDoList({items=[]}: ToDoListProps){
    if (items.length == 0){
        return <p>Hurray! There are no more to do's.</p>
    }
    return (
    <ul>
        {items.map( (item) => <ToDoListItem 
        onRemove= { (id) => { alert(`Removed item ${id}`)} } 
        onCheckedToggle= { (id) => { alert(`Checked item ${id}`)} } 
        item={item}></ToDoListItem> )}
    </ul>)   
}

