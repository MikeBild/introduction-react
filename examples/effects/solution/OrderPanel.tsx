import { useEffect, useState } from 'react';
import type { Customer, LoadOrders, Order } from '../src/ordersApi';

type OrderPanelProps = {
  customer: Customer;
  loadOrders: LoadOrders;
  onReorder: (orderId: string) => void;
};

export const OrderPanel = ({
  customer,
  loadOrders,
  onReorder,
}: OrderPanelProps) => {
  // 1: Abgeleiteter Wert – beim Rendern berechnet, kein State, kein Effect.
  const fullName = `${customer.firstName} ${customer.lastName}`;

  // 2: Synchronisation mit einem externen System bleibt ein Effect –
  // mit AbortController, damit alte Antworten keinen State mehr setzen.
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

  // 3: Interval mit Cleanup.
  const [secondsOpen, setSecondsOpen] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsOpen((seconds) => seconds + 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  // 4: Eine Nutzeraktion gehört in den Event Handler, nicht in einen Effect.
  return (
    <section>
      <h2>Bestellungen von {fullName}</h2>
      <p>Seit {secondsOpen} Sekunden geöffnet</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.productName}{' '}
            <button type="button" onClick={() => onReorder(order.id)}>
              {order.productName} erneut bestellen
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
