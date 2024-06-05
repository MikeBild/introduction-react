import { Header } from "../components/organisms/Header";
import { MenuList } from "../components/organisms/MenuList";
import { Layout } from "../components/templates/Layout";
import { useDelay } from "../lib/useDelay";
import { useFetch } from "../lib/useFetch";

export default function About() {
  const data = useDelay(5000);
  const tData = useFetch();

  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];

  return (
    <Layout>
      <Header>
        <h1>About</h1>
        <MenuList items={menuItems} />
      </Header>
      <hr />
      <div>{JSON.stringify(data, null, 4)}</div>
      <div>{JSON.stringify(tData, null, 4)}</div>
    </Layout>
  );
}
