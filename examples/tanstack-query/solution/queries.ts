import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchOrders, fetchProducts, placeOrder } from '../src/api';
import type { PlaceOrderInput } from '../src/placeOrderInput';

// Key und queryFn gebündelt – wiederverwendbar in Components und Loadern.
export const productsQuery = (search: string) =>
  queryOptions({
    queryKey: ['products', search],
    // Das signal bricht veraltete Requests ab, wie der AbortController im eigenen Hook.
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
    // Nach dem Bestellen ist die Bestellübersicht veraltet.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};
