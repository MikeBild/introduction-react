import { useEffect, useState } from "react";
import { TodoAdd } from "../components/moleculs/TodoAdd";
import { TodoList } from "../components/organisms/TodoList";
import { Layout } from "../components/templates/Layout";
import { useUserContext } from "../lib/userProvider";
import { useFetch } from "../lib/useFetch";
import { useJsonFetch } from "../lib/useJsonFetch";

export default function Index() {
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];
  const [todoItems, setTodoItems] = useState([]);
  const [currentUser] = useUserContext();
  const { error, loading, fetchData } = useJsonFetch(`http://localhost:8080`);

  useEffect(() => {
    if (!currentUser.username) return;

    fetchData(`todos/${currentUser.username}`)
      .then((data) => {
        return Object.keys(data).map((x) => ({
          id: x,
          desc: x,
          state: data[x],
        }));
      })
      .then((data) => setTodoItems(data));
  }, []);

  return (
    <Layout>
      <h1>Home</h1>
      <TodoAdd
        onTodoAdd={(desc) => {
          setTodoItems([...todoItems, { desc }]);
        }}
      />
      <TodoList items={todoItems} />
    </Layout>
  );
}
