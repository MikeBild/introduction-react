export type Order = {
  id: string;
  number: number;
  customerName: string;
  totalInCents: number;
};

// Ein State pro Situation – nie gleichzeitig loading und error.
export type OrdersState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; orders: readonly Order[] };

export const sampleOrders: readonly Order[] = [
  {
    id: 'o-1001',
    number: 1001,
    customerName: 'Ada Lovelace',
    totalInCents: 4900,
  },
  {
    id: 'o-1002',
    number: 1002,
    customerName: 'Grace Hopper',
    totalInCents: 1290,
  },
  {
    id: 'o-1003',
    number: 1003,
    customerName: 'Alan Turing',
    totalInCents: 6580,
  },
];

export const formatPrice = (amountInCents: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    amountInCents / 100
  );
