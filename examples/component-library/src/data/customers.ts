import { orders, type CustomerId } from '../shop';

export { customers, type Customer } from '../shop';

export const countOrders = (customerId: CustomerId) =>
  orders.filter((order) => order.customerId === customerId).length;
