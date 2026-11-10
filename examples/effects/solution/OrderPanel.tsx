import { useEffect, useState } from 'react';
import type { Customer, LoadOrders, Order } from '../src/ordersApi';
import { formatCents, orderTotalCents, type OrderId } from '../src/shop';

type OrderPanelProps = {
  customer: Customer;
  loadOrders: LoadOrders;
  onReorder: (orderId: OrderId) => void;
};

export const OrderPanel = ({
  customer,
  loadOrders,
  onReorder,
}: OrderPanelProps) => {
  // 2: Synchronizing with an external system stays an Effect –
  // with an AbortController, so that old responses no longer set State.
  const [orders, setOrders] = useState<readonly Order[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    loadOrders(customer.id, controller.signal).then(
      (loadedOrders) => {
        if (!controller.signal.aborted) setOrders(loadedOrders);
      },
      (error: unknown) => {
        if (!controller.signal.aborted) throw error;
      }
    );
    return () => controller.abort();
  }, [customer.id, loadOrders]);

  // 1: Derived value – computed during render, no State, no Effect.
  const totalCents = orders.reduce(
    (sum, order) => sum + orderTotalCents(order.items),
    0
  );

  // 3: Interval with cleanup.
  const [secondsOpen, setSecondsOpen] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsOpen((seconds) => seconds + 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  // 4: A user action belongs in the event handler, not in an Effect.
  return (
    <section>
      <h2>Bestellungen von {customer.name}</h2>
      <p>Seit {secondsOpen} Sekunden geöffnet</p>
      <p>Summe: {formatCents(totalCents)}</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Bestellung {order.id}{' '}
            <button type="button" onClick={() => onReorder(order.id)}>
              Bestellung {order.id} erneut bestellen
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
