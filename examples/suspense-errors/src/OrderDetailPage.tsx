import { useEffect, useState } from 'react';
import { errorText } from './errorText';
import type { OrderCache } from './orderCache';
import type { OrderId } from './orders';
import { OrderView } from './OrderSummary';

type OrderSectionProps = { orderId: OrderId; orderCache: OrderCache };

type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

// Übung react-suspense-errors: Jede Component prüft Loading und Error selbst.
// Ersetze den Hook durch use() und setz je Bereich Suspense und ErrorBoundary.
const useLoad = <T,>(load: () => Promise<T>, key: OrderId) => {
  const [state, setState] = useState<LoadState<T>>({ status: 'loading' });
  useEffect(() => {
    let isCurrent = true;
    setState({ status: 'loading' });
    load().then(
      (data) => isCurrent && setState({ status: 'success', data }),
      (error: unknown) =>
        isCurrent &&
        setState({
          status: 'error',
          message: errorText(error, 'Lade die Seite neu.'),
        })
    );
    return () => {
      isCurrent = false;
    };
    // load ist bei jedem Render neu – der Effect hängt nur an der Bestellung.
  }, [key]);
  return state;
};

const OrderSummary = ({ orderId, orderCache }: OrderSectionProps) => {
  const order = useLoad(() => orderCache.readOrder(orderId), orderId);
  if (order.status === 'loading') return <p>Bestellung lädt …</p>;
  if (order.status === 'error') return <p role="alert">{order.message}</p>;
  return <OrderView order={order.data} />;
};

const ShipmentStatus = ({ orderId, orderCache }: OrderSectionProps) => {
  const shipment = useLoad(() => orderCache.readShipment(orderId), orderId);
  if (shipment.status === 'loading') return <p>Versandstatus lädt …</p>;
  if (shipment.status === 'error')
    return <p role="alert">{shipment.message}</p>;
  return <p>Versand: {shipment.data.status}</p>;
};

export const OrderDetailPage = (props: OrderSectionProps) => (
  <>
    <OrderSummary {...props} />
    <ShipmentStatus {...props} />
  </>
);
