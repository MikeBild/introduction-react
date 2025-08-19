import "./App.css";
import Layout from "../components/Layout";
import { useAuthContext } from "../components/AuthProvider";
import ToDoList from "../components/MyToDoList";
import { useStore } from "../components/StoreProvider";
import { Navigate, useNavigate } from "react-router";

export default function App() {
  const auth = useAuthContext();
  const store = useStore();
  const navigateTo = useNavigate();

  if (!auth?.isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout
      loggedInUser={auth?.userToken || null}
      setLoggedInUser={() => auth.logout()}
    >
      <button onClick={() => navigateTo("/todos/add")}>Add Todo</button>
      <ToDoList
        todoList={{ todos: store?.todoList.todos }}
        onItemDoneToggle={() => {}}
        onItemRemoved={(todo) => store?.removeTodo(todo)}
      />
    </Layout>
  );
}
