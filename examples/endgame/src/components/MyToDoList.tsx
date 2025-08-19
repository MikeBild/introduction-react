import ToDoListItem from "./ToDoListItem";
import type { TodoList } from "./TodoList";
import "./MyToDoList.css";

interface ToDoListProps {
    todoList: TodoList;
}

export default function ToDoList({todoList = {todos: []}}: ToDoListProps){
    if (todoList.todos.length == 0){
        return <p>Hurray! There are no more to do's.</p>
    }
    return (
    <ul>
        {todoList.todos.map( (item) => <ToDoListItem 
        onRemove= { (item) => { alert(`Removed item ${item.text}`)} } 
        onCheckedToggle= { (item) => { alert(`Checked item ${item.text}`)} } 
        item={item}></ToDoListItem> )}
    </ul>)   
}

