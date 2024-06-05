import Head from "next/head";
import { useUserContext } from "../../lib/userProvider";
import { Header } from "../organisms/Header";
import { MenuList } from "../organisms/MenuList";
import Link from "next/link";

export function Layout({ children }) {
  const [currentUser] = useUserContext();
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Header>
        <MenuList items={menuItems} />
        {currentUser.username && <span>Username: {currentUser.username}</span>}
        {!currentUser.username && <Link href="/login">Login</Link>}
      </Header>
      <main>{children}</main>
    </>
  );
}
