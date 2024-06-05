import { useState } from "react";
import { TodoAdd } from "../components/moleculs/TodoAdd";
import { Header } from "../components/organisms/Header";
import { TodoList } from "../components/organisms/TodoList";
import { MenuList } from "../components/organisms/MenuList";
import { Layout } from "../components/templates/Layout";
import { useUserContext } from "../lib/userProvider";

export default function Index() {
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];
  const [todoItems, setTodoItems] = useState([]);
  const [currentUser] = useUserContext();

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
