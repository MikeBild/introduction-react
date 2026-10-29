import { useQuery } from '@tanstack/react-query';
import { errorText } from '../src/errorText';
import { statusLabels } from '../src/orderLabels';
import { formatCents, orderTotalCents } from '../src/shop';
import { ordersQuery } from './queries';

export const OrderList = () => {
  const orders = useQuery(ordersQuery);
  if (orders.isPending) return <p>Lade Bestellungen …</p>;
  if (orders.isError) return <p role="alert">{errorText(orders.error)}</p>;
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
