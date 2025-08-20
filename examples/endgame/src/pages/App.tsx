import "./App.css";
import Layout from "../components/Layout";
import { useAuthContext } from "../components/AuthProvider";
import ToDoList from "../components/MyToDoList";
import { useStore } from "../components/ApiProvider";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";

export default function App() {
  const auth = useAuthContext();
  const store = useStore();
  const navigateTo = useNavigate();

  if (!auth?.isAuthenticated) return <Navigate to="/login" />;

  useEffect(() => {
    store?.readTodos();
  }, []);

  return (
    <Layout
      loggedInUser={auth?.userToken || null}
      setLoggedInUser={() => auth.logout()}
    >
      <button onClick={() => navigateTo("/todos/add")}>Add Todo</button>
      <ToDoList
        todoList={{ todos: store?.todoList.todos }}
        onItemDoneToggle={() => {}}
        onItemRemoved={async (todo) => await store?.removeTodo(todo)}
      />
    </Layout>
  );
}
