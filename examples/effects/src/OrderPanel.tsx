import { useEffect, useState } from 'react';
import type { Customer, LoadOrders, Order } from './ordersApi';
import { formatCents, orderTotalCents, type OrderId } from './shop';

type OrderPanelProps = {
  customer: Customer;
  loadOrders: LoadOrders;
  onReorder: (orderId: OrderId) => void;
};

// Exercise react-effects: check each of the four Effects.
export const OrderPanel = ({
  customer,
  loadOrders,
  onReorder,
}: OrderPanelProps) => {
  // Effect 2: request without abort
  const [orders, setOrders] = useState<readonly Order[]>([]);
  useEffect(() => {
    loadOrders(customer.id).then(setOrders);
  }, [customer.id, loadOrders]);

  // Effect 1: derived value as State
  const [totalCents, setTotalCents] = useState(0);
  useEffect(() => {
    setTotalCents(
      orders.reduce((sum, order) => sum + orderTotalCents(order.items), 0)
    );
  }, [orders]);

  // Effect 3: interval without cleanup
  const [secondsOpen, setSecondsOpen] = useState(0);
  useEffect(() => {
    setInterval(() => setSecondsOpen((seconds) => seconds + 1), 1000);
  }, []);

  // Effect 4: reacts to a click
  const [reorderId, setReorderId] = useState<OrderId | null>(null);
  useEffect(() => {
    if (reorderId) onReorder(reorderId);
  }, [reorderId, onReorder]);

  return (
    <section>
      <h2>Bestellungen von {customer.name}</h2>
      <p>Seit {secondsOpen} Sekunden geöffnet</p>
      <p>Summe: {formatCents(totalCents)}</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Bestellung {order.id}{' '}
            <button type="button" onClick={() => setReorderId(order.id)}>
              Bestellung {order.id} erneut bestellen
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
