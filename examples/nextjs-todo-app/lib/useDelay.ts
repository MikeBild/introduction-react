import { useEffect, useState } from "react";

export function useDelay(ms: number) {
  const [data, setData] = useState({ a: 1, b: 0 });
  useEffect(() => {
    const [p, tr] = delay(ms);

    p.then(() => {
      setData({ ...data, b: 2 });
    });

    return () => {
      clearTimeout(tr);
    };
  }, []);

  return data;
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
