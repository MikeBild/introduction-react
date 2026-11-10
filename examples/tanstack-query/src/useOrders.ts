import { useEffect, useState } from 'react';
import { fetchOrders } from './api';
import { errorText } from './errorText';
import type { Order } from './shop';
import type { LoadState } from './useProducts';

type Result = { version: number } & LoadState<Order[]>;

// Another Custom Hook – almost the same code as useProducts.
// Reloading here means: increment version.
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
  // While reloading, the old list stays until the new one arrives.
  return result ?? { status: 'loading' };
};
