import { Suspense, use } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { errorText } from '../src/errorText';
import type { OrderCache } from '../src/orderCache';
import type { OrderId } from '../src/orders';
import { OrderView } from '../src/OrderSummary';

type OrderSectionProps = { orderId: OrderId; orderCache: OrderCache };

const OrderSummary = ({ orderId, orderCache }: OrderSectionProps) => {
  const order = use(orderCache.readOrder(orderId));
  return <OrderView order={order} />;
};

const ShipmentStatus = ({ orderId, orderCache }: OrderSectionProps) => {
  const shipment = use(orderCache.readShipment(orderId));
  return <p>Versand: {shipment.status}</p>;
};

// error ist unknown: Geworfen werden kann alles, nicht nur Error-Objekte.
// errorText macht daraus einen lesbaren Satz mit nächstem Schritt.
const OrderErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>
      Die Bestellung konnte nicht geladen werden.{' '}
      {errorText(error, 'Versuch es mit „Erneut laden“ noch einmal.')}
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
