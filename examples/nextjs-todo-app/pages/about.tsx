import { Header } from "../components/organisms/Header";
import { MenuList } from "../components/organisms/MenuList";

export default function About() {
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];
  return (
    <>
      <Header>
        <h1>About</h1>
        <MenuList items={menuItems} />
      </Header>
    </>
  );
}
