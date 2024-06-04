import { TodoAdd } from "../components/moleculs/TodoAdd";
import { Header } from "../components/organisms/Header";
import { TodoList } from "../components/organisms/TodoList";
import { MenuList } from "../components/organisms/MenuList";

export default function Index() {
  const items = [];

  return (
    <>
      <Header>
        <MenuList items={[]} />
      </Header>
      <TodoAdd />
      <TodoList items={items} />
    </>
  );
}
