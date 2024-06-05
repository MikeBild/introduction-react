import { useEffect, useState } from "react";

export function useFetch() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);

  return data;
}

// function a(cb) {
//   console.log("1");
//   setTimeout(() => cb(), 0);
//   console.log("2");
// }
// console.log("a");
// a(() => {
//   console.log("3");
// });
// console.log("b");
