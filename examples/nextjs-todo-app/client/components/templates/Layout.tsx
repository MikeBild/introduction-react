import Head from "next/head";
import { useUserContext } from "../../lib/userProvider";
import { Header } from "../organisms/Header";
import { MenuList } from "../organisms/MenuList";
import Link from "next/link";
import { useRouter } from "next/router";

export function Layout({ children }) {
  const router = useRouter();
  const [currentUser, setUser] = useUserContext();
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
        {currentUser.username && (
          <span>
            Username: {currentUser.username}
            <button
              onClick={() => {
                setUser({ username: "", token: "" });
                router.push("/login");
              }}
            >
              Logout
            </button>
          </span>
        )}
        {!currentUser.username && <Link href="/login">Login</Link>}
      </Header>
      <main>{children}</main>
    </>
  );
}
