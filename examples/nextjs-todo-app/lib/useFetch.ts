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

// import { useState, useCallback } from "react";

// export const useFetch = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = useCallback(async (url: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(url);
//       const data = await response.text();
//       setLoading(false);
//       return data;
//     } catch (error: any) {
//       if (error.name !== "AbortError") {
//         setLoading(false);
//         setError(error.message);
//       }
//     }
//   }, []);

//   return { error, loading, fetchData };
// };
