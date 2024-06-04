import { useEffect, useState } from "react";
import { Header } from "../components/organisms/Header";
import { MenuList } from "../components/organisms/MenuList";

export default function About() {
  const [data, setData] = useState({ a: 1, b: 0 });
  const menuItems = [
    { url: "/about", text: "About" },
    { url: "/", text: "Home" },
  ];

  useEffect(() => {
    const [p, tr] = delay(500);
    
    p.then(() => {
      setData({ ...data, b: 2 });
    });

    return () => {
      clearTimeout(tr);
    };
  }, [data]);

  return (
    <>
      <Header>
        <h1>About</h1>
        <MenuList items={menuItems} />
      </Header>
      <hr />
      <div>{JSON.stringify(data, null, 4)}</div>
    </>
  );
}

function delay(ms: number): [Promise<void>, NodeJS.Timeout] {
  let timeoutRef = null;
  return [
    new Promise((resolve) => {
      timeoutRef = setTimeout(() => {
        resolve();
      }, ms);
    }),
    timeoutRef,
  ];
}
