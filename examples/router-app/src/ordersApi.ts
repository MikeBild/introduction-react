import { orders, type Order, type OrderStatus } from './shop';

// Fake-API ohne Netzwerk: antwortet nach kurzer Pause und lässt sich abbrechen.
const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

export const fetchOrders = async (
  status: OrderStatus | 'all',
  signal?: AbortSignal
): Promise<Order[]> => {
  await delay(50, signal);
  return orders.filter((order) => status === 'all' || order.status === status);
};

export const fetchOrder = async (
  orderId: string,
  signal?: AbortSignal
): Promise<Order | undefined> => {
  await delay(50, signal);
  return orders.find((order) => order.id === orderId);
};
