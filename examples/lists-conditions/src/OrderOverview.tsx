import { customerName, statusLabels, type OrdersState } from './orders';
import { formatCents, orderTotalCents } from './shop';

// Übung: Bisher gibt es nur den Happy Path, und der Key ist die Position.
// Ergänze eigene Ansichten für Loading, Error und Empty und nutze stabile Keys.
export const OrderOverview = ({ state }: { state: OrdersState }) => {
  const orders = state.status === 'success' ? state.orders : [];
  return (
    <ul>
      {orders.map((order, index) => (
        <li key={index}>
          <label>
            <input type="checkbox" /> Bestellung {order.id} geprüft
          </label>
          <span>
            {' '}
            – {customerName(order.customerId)}, {statusLabels[order.status]},{' '}
            {formatCents(orderTotalCents(order.items))}
          </span>
        </li>
      ))}
    </ul>
  );
};
