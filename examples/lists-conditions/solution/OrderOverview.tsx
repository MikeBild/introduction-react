import {
  customerName,
  statusLabels,
  type Order,
  type OrdersState,
} from '../src/orders';
import { formatCents, orderTotalCents } from '../src/shop';

const OrderRow = ({ order }: { order: Order }) => (
  <li>
    <label>
      <input type="checkbox" /> Bestellung {order.id} geprüft
    </label>
    <span>
      {' '}
      – {customerName(order.customerId)}, {statusLabels[order.status]},{' '}
      {formatCents(orderTotalCents(order.items))}
    </span>
  </li>
);

export const OrderOverview = ({ state }: { state: OrdersState }) => {
  switch (state.status) {
    case 'loading':
      return <p role="status">Bestellungen werden geladen …</p>;
    case 'error':
      return (
        <p role="alert">
          Bestellungen nicht verfügbar ({state.message}). Lade die Seite neu und
          versuch es noch einmal.
        </p>
      );
    case 'success':
      if (state.orders.length === 0)
        return (
          <p>
            Noch keine Bestellungen. Sobald jemand bestellt, erscheint die
            Bestellung hier.
          </p>
        );
      return (
        <ul>
          {state.orders.map((order) => (
            // Die ID gehört zur Bestellung – die Position nicht.
            <OrderRow key={order.id} order={order} />
          ))}
        </ul>
      );
  }
};
