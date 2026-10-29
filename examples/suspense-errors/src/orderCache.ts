import type { Order, OrderApi, OrderId, Shipment } from './orders';

// use() braucht ein stabiles Promise: Es entsteht hier, nicht beim Rendern.
// Derselbe Request liefert bei jedem Render dasselbe Promise aus dem Cache.
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
    // Ein abgelehntes Promise bleibt abgelehnt – für einen Retry muss es raus.
    forgetOrder: (orderId: OrderId) => orders.delete(orderId),
    forgetShipment: (orderId: OrderId) => shipments.delete(orderId),
  };
};

export type OrderCache = ReturnType<typeof createOrderCache>;
