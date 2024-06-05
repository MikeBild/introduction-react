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