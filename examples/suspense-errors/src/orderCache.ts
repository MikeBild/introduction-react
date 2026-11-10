import type { Order, OrderApi, OrderId, Shipment } from './orders';

// use() needs a stable Promise: it is created here, not during render.
// The same request returns the same Promise from the cache on every render.
export const createOrderCache = (api: OrderApi) => {
  const orders = new Map<OrderId, Promise<Order>>();
  const shipments = new Map<OrderId, Promise<Shipment>>();
  const getOrCreate = <T>(
    cache: Map<OrderId, Promise<T>>,
    key: OrderId,
    load: (key: OrderId) => Promise<T>
  ) => {
    const cached = cache.get(key);
    if (cached) return cached;
    const promise = load(key);
    cache.set(key, promise);
    return promise;
  };
  return {
    readOrder: (orderId: OrderId) =>
      getOrCreate(orders, orderId, api.fetchOrder),
    readShipment: (orderId: OrderId) =>
      getOrCreate(shipments, orderId, api.fetchShipment),
    // A rejected Promise stays rejected – for a retry it has to go.
    forgetOrder: (orderId: OrderId) => orders.delete(orderId),
    forgetShipment: (orderId: OrderId) => shipments.delete(orderId),
  };
};

export type OrderCache = ReturnType<typeof createOrderCache>;
