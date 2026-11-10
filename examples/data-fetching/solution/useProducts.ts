import { useEffect, useState } from 'react';
import { errorText } from '../src/errorText';
import type { Product } from '../src/shop';
import { fetchProducts } from './fetchProducts';

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

// Result together with the search text it belongs to
type Result<T> = { search: string } & LoadState<T>;

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
    // The cleanup aborts the request for the old search text.
    return () => controller.abort();
  }, [search]);
  // If the result does not match the current search text, it is still loading.
  return result?.search === search ? result : { status: 'loading' };
};
