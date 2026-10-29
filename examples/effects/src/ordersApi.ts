import { orders, type CustomerId, type Order } from './shop';

export { customers } from './shop';
export type { Customer, Order } from './shop';

export type LoadOrders = (
  customerId: CustomerId,
  signal?: AbortSignal
) => Promise<readonly Order[]>;

// Fake API: antwortet nach einer zufälligen Zeit, ohne Netzwerk.
export const loadOrders: LoadOrders = (customerId) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(orders.filter((order) => order.customerId === customerId)),
      200 + Math.random() * 800
    )
  );
