import { useEffect, useState } from 'react';
import type { Product } from '../src/shop';
import { fetchProducts } from './fetchProducts';

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

// Ergebnis mit dem Suchtext, zu dem es gehört
type Result<T> = { search: string } & LoadState<T>;

export const useProducts = (search: string): LoadState<Product[]> => {
  const [result, setResult] = useState<Result<Product[]> | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(search, controller.signal)
      .then((data) => setResult({ search, status: 'success', data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setResult({ search, status: 'error', message: String(error) });
      });
    // Der Cleanup bricht den Request für den alten Suchtext ab.
    return () => controller.abort();
  }, [search]);
  // Passt das Ergebnis nicht zum aktuellen Suchtext, lädt es noch.
  return result?.search === search ? result : { status: 'loading' };
};
