import Head from "next/head";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
