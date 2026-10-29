import { Suspense, use } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { OrderCache } from '../src/orderCache';

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

// error ist unknown: Geworfen werden kann alles, nicht nur Error-Objekte.
const OrderErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>
      Die Bestellung konnte nicht geladen werden:{' '}
      {error instanceof Error ? error.message : 'Unbekannter Fehler'}
    </p>
    <button type="button" onClick={resetErrorBoundary}>
      Erneut laden
    </button>
  </div>
);

const ShipmentErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <p>
    Versandstatus ist gerade nicht verfügbar.{' '}
    <button type="button" onClick={resetErrorBoundary}>
      Versandstatus erneut laden
    </button>
  </p>
);

export const OrderDetailPage = ({ orderId, orderCache }: OrderSectionProps) => (
  // Äußere Boundary: Ohne Bestellung ist die Seite nutzlos.
  <ErrorBoundary
    FallbackComponent={OrderErrorFallback}
    // Vor dem Retry das abgelehnte Promise aus dem Cache werfen.
    onReset={() => orderCache.forgetOrder(orderId)}
    resetKeys={[orderId]}
  >
    <Suspense fallback={<p>Bestellung lädt …</p>}>
      <OrderSummary orderId={orderId} orderCache={orderCache} />
      {/* Innere Boundary: Der langsame Versandstatus blockiert die
          Bestellung nicht, und sein Fehler bleibt lokal. */}
      <ErrorBoundary
        FallbackComponent={ShipmentErrorFallback}
        onReset={() => orderCache.forgetShipment(orderId)}
        resetKeys={[orderId]}
      >
        <Suspense fallback={<p>Versandstatus lädt …</p>}>
          <ShipmentStatus orderId={orderId} orderCache={orderCache} />
        </Suspense>
      </ErrorBoundary>
    </Suspense>
  </ErrorBoundary>
);
