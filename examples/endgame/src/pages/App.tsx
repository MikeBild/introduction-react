import "./App.css";
import Layout from "../components/Layout";
import { useAuthContext } from "../components/AuthProvider";
import ToDoList from "../components/MyToDoList";
import { useStore } from "../components/ApiProvider";
import { Link, Navigate, useNavigate } from "react-router";
import { useEffect } from "react";

export default function App() {
  const auth = useAuthContext();
  const store = useStore();
  const navigateTo = useNavigate();

  if (!auth?.isAuthenticated) return <Navigate to="/login" />;

  useEffect(() => {
    const ac = new AbortController();
    store?.readTodos(ac);
    return () => {
      ac.abort("... unmount");
    };
  }, []);

  if (store?.isLoading) return <h1>Fetching from API ...</h1>;
  if (store?.error)
    return (
      <>
        <h1 style={{ color: "red" }}>{store?.error}</h1>
        <Link to="/">Home</Link>
      </>
    );

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
