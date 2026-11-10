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

// error is unknown: anything can be thrown, not just Error objects.
// errorText turns it into a readable sentence with a next step.
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
  // Outer boundary: without the order the page is useless.
  <ErrorBoundary
    FallbackComponent={OrderErrorFallback}
    // Before the retry, evict the rejected Promise from the cache.
    onReset={() => orderCache.forgetOrder(orderId)}
    resetKeys={[orderId]}
  >
    <Suspense fallback={<p>Bestellung lädt …</p>}>
      <OrderSummary orderId={orderId} orderCache={orderCache} />
      {/* Inner boundary: the slow shipment status does not block the
          order, and its error stays local. */}
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
