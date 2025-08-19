import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useAuthContext } from "./components/AuthProvider";
import LoginSignupScreen from "./components/LoginScreen";
import ToDoList from "./components/MyToDoList";
import { useStore } from "./components/StoreProvider";
import TodoInput from "./components/TodoInput";
import type { Todo } from "./components/TodoList";

function Dialog({ onOk }: { onOk: () => void }) {
  return (
    <div>
      <p>Confirm</p>
      <button onClick={onOk}>Ok</button>
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState("");
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [removeTodoVisible, setRemoveTodoVisible] = useState(false);
  const [todoItemToRemove, setTodoItemToRemove] = useState<Todo | null>();
  const auth = useAuthContext();
  const store = useStore([{ done: true, isImportant: true, text: "dkjdjkdj" }]);

  return (
    <Layout
      loggedInUser={auth?.isAuthenticated ? username : null}
      setLoggedInUser={() => setUsername("")}
    >
      {auth?.isAuthenticated && (
        <>
          {addTodoVisible && (
            <TodoInput
              onSave={(newTodo) => {
                store.todoList.todos = [
                  ...store.todoList.todos,
                  { ...newTodo, isImportant: newTodo.important },
                ];
                setAddTodoVisible(false);
              }}
              onCancel={() => {
                setAddTodoVisible(false);
              }}
            />
          )}

          {removeTodoVisible && (
            <Dialog
              onOk={() => {
                store.todoList.todos = store.todoList.todos.filter(
                  (x) => x.text !== todoItemToRemove?.text
                );
                setTodoItemToRemove(null);
                setRemoveTodoVisible(false);
              }}
            />
          )}

          {!addTodoVisible && (
            <>
              <button
                onClick={() => {
                  setAddTodoVisible(true);
                }}
              >
                Add Todo
              </button>
              <ToDoList
                todoList={{ todos: store.todoList.todos }}
                onItemDoneToggle={() => {}}
                onItemRemoved={(todo) => {
                  setTodoItemToRemove(todo);
                  setRemoveTodoVisible(true);
                }}
              />
            </>
          )}
        </>
      )}

      {!auth?.isAuthenticated && (
        <LoginSignupScreen
          onLoginSubmit={(username) => {
            auth?.login(username);
            setUsername(username);
          }}
        />
      )}
    </Layout>
  );
}
