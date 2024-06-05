import Head from "next/head";
import { useUserContext } from "../../lib/userProvider";

export function Layout({ children }) {
  const [currentUser] = useUserContext();

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <header>{currentUser.username}</header>
      <main>{children}</main>
    </>
  );
}
