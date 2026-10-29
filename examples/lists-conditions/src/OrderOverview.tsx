import { formatPrice, type OrdersState } from './orders';

// Übung: Bisher gibt es nur den Happy Path, und der Key ist die Position.
// Ergänze eigene Ansichten für Loading, Error und Empty und nutze stabile Keys.
export const OrderOverview = ({ state }: { state: OrdersState }) => {
  const orders = state.status === 'success' ? state.orders : [];
  return (
    <ul>
      {orders.map((order, index) => (
        <li key={index}>
          <label>
            <input type="checkbox" /> Bestellung {order.number} geprüft
          </label>
          <span>
            {' '}
            – {order.customerName}, {formatPrice(order.totalInCents)}
          </span>
        </li>
      ))}
    </ul>
  );
};
