import { useEffect, useState } from 'react';
import type { Customer, LoadOrders, Order } from './ordersApi';
import { formatCents, orderTotalCents, type OrderId } from './shop';

type OrderPanelProps = {
  customer: Customer;
  loadOrders: LoadOrders;
  onReorder: (orderId: OrderId) => void;
};

// Übung react-effects: Prüfe jeden der vier Effects.
export const OrderPanel = ({
  customer,
  loadOrders,
  onReorder,
}: OrderPanelProps) => {
  // Effect 2: Request ohne Abbruch
  const [orders, setOrders] = useState<readonly Order[]>([]);
  useEffect(() => {
    loadOrders(customer.id).then(setOrders);
  }, [customer.id, loadOrders]);

  // Effect 1: abgeleiteter Wert als State
  const [totalCents, setTotalCents] = useState(0);
  useEffect(() => {
    setTotalCents(
      orders.reduce((sum, order) => sum + orderTotalCents(order.items), 0)
    );
  }, [orders]);

  // Effect 3: Interval ohne Cleanup
  const [secondsOpen, setSecondsOpen] = useState(0);
  useEffect(() => {
    setInterval(() => setSecondsOpen((seconds) => seconds + 1), 1000);
  }, []);

  // Effect 4: reagiert auf einen Klick
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
