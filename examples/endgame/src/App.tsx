import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useAuthContext } from "./components/AuthProvider";
import LoginSignupScreen from "./components/LoginScreen";
import ToDoList from "./components/MyToDoList";
import { useStore } from "./components/StoreProvider";
import TodoInput from "./components/TodoInput";

export default function App() {
  const [username, setUsername] = useState("");
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const auth = useAuthContext();
  const store = useStore();

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
                store?.addTodo({ ...newTodo, isImportant: newTodo.important });
                setAddTodoVisible(false);
              }}
              onCancel={() => setAddTodoVisible(false)}
            />
          )}

          {!addTodoVisible && (
            <>
              <button onClick={() => setAddTodoVisible(true)}>Add Todo</button>
              <ToDoList
                todoList={{ todos: store?.todoList.todos }}
                onItemDoneToggle={() => {}}
                onItemRemoved={(todo) => store?.removeTodo(todo)}
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
