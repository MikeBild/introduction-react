import { useEffect, useState } from 'react';
import type { Customer, LoadOrders, Order } from './ordersApi';

type OrderPanelProps = {
  customer: Customer;
  loadOrders: LoadOrders;
  onReorder: (orderId: string) => void;
};

// Übung react-effects: Prüfe jeden der vier Effects.
export const OrderPanel = ({
  customer,
  loadOrders,
  onReorder,
}: OrderPanelProps) => {
  // Effect 1: abgeleiteter Wert als State
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(`${customer.firstName} ${customer.lastName}`);
  }, [customer.firstName, customer.lastName]);

  // Effect 2: Request ohne Abbruch
  const [orders, setOrders] = useState<readonly Order[]>([]);
  useEffect(() => {
    loadOrders(customer.id).then(setOrders);
  }, [customer.id, loadOrders]);

  // Effect 3: Interval ohne Cleanup
  const [secondsOpen, setSecondsOpen] = useState(0);
  useEffect(() => {
    setInterval(() => setSecondsOpen((seconds) => seconds + 1), 1000);
  }, []);

  // Effect 4: reagiert auf einen Klick
  const [reorderId, setReorderId] = useState<string | null>(null);
  useEffect(() => {
    if (reorderId) onReorder(reorderId);
  }, [reorderId, onReorder]);

  return (
    <section>
      <h2>Bestellungen von {fullName}</h2>
      <p>Seit {secondsOpen} Sekunden geöffnet</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.productName}{' '}
            <button type="button" onClick={() => setReorderId(order.id)}>
              {order.productName} erneut bestellen
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
