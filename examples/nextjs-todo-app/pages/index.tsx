import { TodoAdd } from "../components/moleculs/TodoAdd";
import { Header } from "../components/organisms/Header";
import { TodoList } from "../components/organisms/TodoList";
import { MenuList } from "../components/organisms/MenuList";
import { useState } from "react";

export default function Index() {
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];
  const [todoItems, setTodoItems] = useState([]);

  return (
    <>
      <Header>
        <h1>Home</h1>
        <MenuList items={menuItems} />
      </Header>
      <TodoAdd
        onTodoAdd={(desc) => {
          setTodoItems([...todoItems, { desc }]);
        }}
      />
      <TodoList items={todoItems} />
    </>
  );
}
