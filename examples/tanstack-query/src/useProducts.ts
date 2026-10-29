import { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import { errorText } from './errorText';
import type { Product } from './shop';

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

type Result<T> = { search: string } & LoadState<T>;

// Der eigene Hook aus der Lektion react-data-fetching.
export const useProducts = (search: string): LoadState<Product[]> => {
  const [result, setResult] = useState<Result<Product[]> | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(search, controller.signal)
      .then((data) => setResult({ search, status: 'success', data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setResult({ search, status: 'error', message: errorText(error) });
      });
    return () => controller.abort();
  }, [search]);
  return result?.search === search ? result : { status: 'loading' };
};
