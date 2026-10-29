import { statusLabels } from './orderLabels';
import { formatCents, orderTotalCents } from './shop';
import { useOrders } from './useOrders';

export const OrderList = ({ version }: { version: number }) => {
  const orders = useOrders(version);
  if (orders.status === 'loading') return <p>Lade Bestellungen …</p>;
  if (orders.status === 'error') return <p role="alert">{orders.message}</p>;
  return (
    <ul aria-label="Bestellungen">
      {orders.data.map((order) => (
        <li key={order.id}>
          Bestellung {order.id} – {statusLabels[order.status]} –{' '}
          {formatCents(orderTotalCents(order.items))}
        </li>
      ))}
    </ul>
  );
};
