import { useCallback, useState } from "react";

export function useJsonFetch(baseUrl: string) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${path}`);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setLoading(false);
        setError(error.message);
      }
    }
  }, []);

  return { error, loading, fetchData };
}
