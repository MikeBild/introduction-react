import { useEffect, useState } from 'react';
import { fetchOrders } from './api';
import { errorText } from './errorText';
import type { Order } from './shop';
import type { LoadState } from './useProducts';

type Result = { version: number } & LoadState<Order[]>;

// Noch ein eigener Hook – fast derselbe Code wie useProducts.
// Neu laden heißt hier: version hochzählen.
export const useOrders = (version: number): LoadState<Order[]> => {
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal)
      .then((data) => setResult({ version, status: 'success', data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setResult({ version, status: 'error', message: errorText(error) });
      });
    return () => controller.abort();
  }, [version]);
  // Beim Neuladen bleibt die alte Liste stehen, bis die neue da ist.
  return result ?? { status: 'loading' };
};
