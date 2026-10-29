import { orders, type Order, type OrderId } from './shop';

export type { Order, OrderId } from './shop';

export type Shipment = { orderId: OrderId; status: string };

export type OrderApi = {
  fetchOrder: (orderId: OrderId) => Promise<Order>;
  fetchShipment: (orderId: OrderId) => Promise<Shipment>;
};

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Fake-Backend: o9999 kennt der Server nicht, die Sendungsverfolgung ist
// langsam und fällt beim ersten Aufruf aus.
let shipmentCalls = 0;
export const fakeOrderApi: OrderApi = {
  fetchOrder: async (orderId) => {
    await wait(500);
    const order = orders.find((candidate) => candidate.id === orderId);
    if (!order) throw new Error(`Bestellung ${orderId} nicht gefunden`);
    return order;
  },
  fetchShipment: async (orderId) => {
    await wait(1500);
    shipmentCalls += 1;
    if (shipmentCalls === 1)
      throw new Error('Tracking-Service nicht erreichbar');
    return { orderId, status: 'Unterwegs, Zustellung morgen' };
  },
};
