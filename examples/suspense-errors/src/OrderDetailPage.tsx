import { Suspense, use } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import type { OrderCache } from './orderCache';

type OrderSectionProps = { orderId: string; orderCache: OrderCache };

const formatEuro = (amountInCents: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    amountInCents / 100
  );

const OrderSummary = ({ orderId, orderCache }: OrderSectionProps) => {
  const order = use(orderCache.readOrder(orderId));
  return (
    <section>
      <h2>Bestellung {order.id}</h2>
      <p>Kunde: {order.customer}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.name}>
            {item.quantity} × {item.name}
          </li>
        ))}
      </ul>
      <p>Summe: {formatEuro(order.totalInCents)}</p>
    </section>
  );
};

const ShipmentStatus = ({ orderId, orderCache }: OrderSectionProps) => {
  const shipment = use(orderCache.readShipment(orderId));
  return <p>Versand: {shipment.status}</p>;
};

// Übung react-suspense-errors: Eine Boundary und ein Suspense für alles.
// Fällt die Sendungsverfolgung aus, ist die ganze Seite weg – ohne Retry.
export const OrderDetailPage = (props: OrderSectionProps) => (
  <ErrorBoundary fallback={<p role="alert">Etwas ist schiefgelaufen.</p>}>
    <Suspense fallback={<p>Bestellung lädt …</p>}>
      <OrderSummary {...props} />
      <ShipmentStatus {...props} />
    </Suspense>
  </ErrorBoundary>
);
