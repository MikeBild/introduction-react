import { orders, orderTotalCents, type CustomerId } from './shop';

export {
  customers,
  formatCents,
  products,
  type Customer,
  type Product,
} from './shop';

// Umsatz eines Kunden: Summe aller Bestellungen, die nicht storniert sind.
export const revenueCents = (customerId: CustomerId) =>
  orders
    .filter(
      (order) => order.customerId === customerId && order.status !== 'cancelled'
    )
    .reduce((sum, order) => sum + orderTotalCents(order.items), 0);
