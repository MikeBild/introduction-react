import type { Order, OrderApi, Shipment } from './orders';

// use() braucht ein stabiles Promise: Es entsteht hier, nicht beim Rendern.
// Derselbe Request liefert bei jedem Render dasselbe Promise aus dem Cache.
export const createOrderCache = (api: OrderApi) => {
  const orders = new Map<string, Promise<Order>>();
  const shipments = new Map<string, Promise<Shipment>>();
  const getOrCreate = <T>(
    cache: Map<string, Promise<T>>,
    key: string,
    load: (key: string) => Promise<T>
  ) => {
    const cached = cache.get(key);
    if (cached) return cached;
    const promise = load(key);
    cache.set(key, promise);
    return promise;
  };
  return {
    readOrder: (orderId: string) =>
      getOrCreate(orders, orderId, api.fetchOrder),
    readShipment: (orderId: string) =>
      getOrCreate(shipments, orderId, api.fetchShipment),
    // Ein abgelehntes Promise bleibt abgelehnt – für einen Retry muss es raus.
    forgetOrder: (orderId: string) => orders.delete(orderId),
    forgetShipment: (orderId: string) => shipments.delete(orderId),
  };
};

export type OrderCache = ReturnType<typeof createOrderCache>;
