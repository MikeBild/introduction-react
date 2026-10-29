import {
  customers,
  type CustomerId,
  type Order,
  type OrderStatus,
} from './shop';

export type { Order } from './shop';

// Ein State pro Situation – nie gleichzeitig loading und error.
export type OrdersState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; orders: readonly Order[] };

export const statusLabels: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  placed: 'Bestellt',
  paid: 'Bezahlt',
  shipped: 'Versandt',
  cancelled: 'Storniert',
};

export const customerName = (id: CustomerId) =>
  customers.find((customer) => customer.id === id)?.name ?? 'Unbekannt';
