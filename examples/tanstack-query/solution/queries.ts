import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchOrders, fetchProducts, placeOrder } from '../src/api';
import type { PlaceOrderInput } from '../src/placeOrderInput';

// Key and queryFn bundled – reusable in Components and loaders.
export const productsQuery = (search: string) =>
  queryOptions({
    queryKey: ['products', search],
    // The signal aborts outdated requests, like the AbortController in the Custom Hook.
    queryFn: ({ signal }) => fetchProducts(search, signal),
  });

export const ordersQuery = queryOptions({
  queryKey: ['orders'],
  queryFn: ({ signal }) => fetchOrders(signal),
});

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: PlaceOrderInput) => placeOrder(input),
    // After ordering, the order overview is stale.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};
