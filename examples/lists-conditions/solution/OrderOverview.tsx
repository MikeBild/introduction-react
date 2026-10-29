import { formatPrice, type Order, type OrdersState } from '../src/orders';

const OrderItem = ({ order }: { order: Order }) => (
  <li>
    <label>
      <input type="checkbox" /> Bestellung {order.number} geprüft
    </label>
    <span>
      {' '}
      – {order.customerName}, {formatPrice(order.totalInCents)}
    </span>
  </li>
);

export const OrderOverview = ({ state }: { state: OrdersState }) => {
  switch (state.status) {
    case 'loading':
      return <p role="status">Bestellungen werden geladen …</p>;
    case 'error':
      return <p role="alert">Bestellungen nicht verfügbar: {state.message}</p>;
    case 'success':
      if (state.orders.length === 0) return <p>Noch keine Bestellungen</p>;
      return (
        <ul>
          {state.orders.map((order) => (
            // Die ID gehört zur Bestellung – die Position nicht.
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      );
  }
};
