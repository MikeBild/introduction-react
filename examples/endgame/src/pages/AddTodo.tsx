import { Navigate, useNavigate } from "react-router";
import { useStore } from "../components/ApiProvider";
import TodoInput from "../components/TodoInput";
import { useAuthContext } from "../components/AuthProvider";

export default function AddTodo() {
  const auth = useAuthContext();
  const store = useStore();
  const navigateTo = useNavigate();

  if (!auth?.isAuthenticated) return <Navigate to="/" />;

  return (
    <TodoInput
      onSave={async (newTodo) => {
        await store?.addTodo({ ...newTodo, isImportant: newTodo.important });
        navigateTo("/");
      }}
      onCancel={() => navigateTo("/")}
    />
  );
}
