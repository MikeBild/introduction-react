import { useEffect, useState } from 'react';
import { fetchOrder, fetchOrders } from './ordersApi';
import { readStatus, statusLabels, statuses } from './orderStatus';
import { formatCents, orderTotalCents, type Order } from './shop';

// Übung react-routing: Die Bestellübersicht kennt keine URL.
// – Welche Seite offen ist und welcher Filter gilt, steckt in useState.
// – Reload, Zurück-Button und geteilte Links verlieren die Ansicht.
// – Daten laden in Effects, Errors fängt niemand.
type Page = { name: 'orders' } | { name: 'order'; orderId: string };

const OrdersPage = ({ onOpen }: { onOpen: (orderId: string) => void }) => {
  const [status, setStatus] = useState<ReturnType<typeof readStatus>>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrders(status).then(setOrders);
  }, [status]);
  return (
    <section>
      <h1>Bestellungen</h1>
      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(event) => setStatus(readStatus(event.target.value))}
      >
        <option value="all">Alle</option>
        {statuses.map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <button type="button" onClick={() => onOpen(order.id)}>
              Bestellung {order.id}
            </button>{' '}
            {statusLabels[order.status]}
          </li>
        ))}
      </ul>
    </section>
  );
};

const OrderPage = ({
  orderId,
  onBack,
}: {
  orderId: string;
  onBack: () => void;
}) => {
  const [order, setOrder] = useState<Order>();
  useEffect(() => {
    fetchOrder(orderId).then(setOrder);
  }, [orderId]);
  if (!order) return <p>Lade Bestellung …</p>;
  return (
    <section>
      <h1>Bestellung {order.id}</h1>
      <p>Status: {statusLabels[order.status]}</p>
      <p>Summe: {formatCents(orderTotalCents(order.items))}</p>
      <button type="button" onClick={onBack}>
        Zur Bestellübersicht
      </button>
    </section>
  );
};

export const App = () => {
  const [page, setPage] = useState<Page>({ name: 'orders' });
  return (
    <main>
      {page.name === 'orders' ? (
        <OrdersPage onOpen={(orderId) => setPage({ name: 'order', orderId })} />
      ) : (
        <OrderPage
          orderId={page.orderId}
          onBack={() => setPage({ name: 'orders' })}
        />
      )}
    </main>
  );
};
