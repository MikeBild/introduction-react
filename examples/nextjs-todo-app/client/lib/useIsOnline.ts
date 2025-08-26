import { useState, useEffect } from "react";

export function useIsOnline(init = false) {
  const [isOnline, setIsOnline] = useState(init);

  useEffect(() => {
    const [p, tr] = delay(5000);

    p.then(() => {
      setIsOnline(true);
    });

    return () => {
      clearTimeout(tr);
    };
  }, []);

  return isOnline;
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
