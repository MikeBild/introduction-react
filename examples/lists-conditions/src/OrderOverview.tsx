import { customerName, statusLabels, type OrdersState } from './orders';
import { formatCents, orderTotalCents } from './shop';

// Exercise: so far there is only the happy path, and the key is the position in the list.
// Add separate views for loading, error and empty, and use stable keys.
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
