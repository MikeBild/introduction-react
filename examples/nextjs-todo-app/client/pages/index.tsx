import { useEffect, useState } from "react";
import { TodoAdd } from "../components/moleculs/TodoAdd";
import { TodoList } from "../components/organisms/TodoList";
import { Layout } from "../components/templates/Layout";
import { useUserContext } from "../lib/userProvider";
import { useJsonFetch } from "../lib/useJsonFetch";

export default function Index() {
  const [todoItems, setTodoItems] = useState([]);
  const [currentUser] = useUserContext();
  const { error, loading, fetchData } = useJsonFetch(`http://localhost:8080`);

  useEffect(() => {
    if (!currentUser.username) return;

    loadTodos();
  }, []);

  async function loadTodos() {
    return fetchData(`todos/${currentUser.username}`)
      .then((data) => {
        return Object.keys(data).map((x) => ({
          id: x,
          desc: x,
          state: data[x],
        }));
      })
      .then((data) => setTodoItems(data));
  }

  return (
    <Layout>
      <h1>Home</h1>
      <TodoAdd
        onTodoAdd={async (desc) => {
          setTodoItems([...todoItems, { desc }]);

          await fetch(`http://localhost:8080/todos/${currentUser.username}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ description: desc, state: "open" }),
          });

          await loadTodos();
        }}
      />
      <TodoList items={todoItems} />
    </Layout>
  );
}
