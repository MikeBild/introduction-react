import { orders, orderTotalCents, type CustomerId } from './shop';

export {
  customers,
  formatCents,
  products,
  type Customer,
  type Product,
} from './shop';

// Revenue of a customer: the sum of all orders that are not canceled.
export const revenueCents = (customerId: CustomerId) =>
  orders
    .filter(
      (order) => order.customerId === customerId && order.status !== 'cancelled'
    )
    .reduce((sum, order) => sum + orderTotalCents(order.items), 0);
