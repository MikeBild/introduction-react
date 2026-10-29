export type Order = {
  id: string;
  customer: string;
  totalInCents: number;
  items: readonly { name: string; quantity: number }[];
};

export type Shipment = { orderId: string; status: string };

export type OrderApi = {
  fetchOrder: (orderId: string) => Promise<Order>;
  fetchShipment: (orderId: string) => Promise<Shipment>;
};

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Fake-Backend: o-2 kennt der Server nicht, die Sendungsverfolgung ist langsam
// und fällt beim ersten Aufruf aus.
let shipmentCalls = 0;
export const fakeOrderApi: OrderApi = {
  fetchOrder: async (orderId) => {
    await wait(500);
    if (orderId !== 'o-1')
      throw new Error(`Bestellung ${orderId} nicht gefunden`);
    return {
      id: 'o-1',
      customer: 'Ada Lovelace',
      totalInCents: 6190,
      items: [
        { name: 'Kaffeebohnen', quantity: 1 },
        { name: 'Handmühle', quantity: 1 },
      ],
    };
  },
  fetchShipment: async (orderId) => {
    await wait(1500);
    shipmentCalls += 1;
    if (shipmentCalls === 1)
      throw new Error('Tracking-Service nicht erreichbar');
    return { orderId, status: 'Unterwegs, Zustellung morgen' };
  },
};
