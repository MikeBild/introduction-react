import {
  data,
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import { fetchOrder } from '../src/ordersApi';
import { statusLabels } from '../src/orderStatus';
import { formatCents, orderTotalCents, products } from '../src/shop';

export const orderLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const order = await fetchOrder(params.orderId ?? '', request.signal);
  // Wirft der Loader, rendert die ErrorBoundary dieser Route.
  if (!order) throw data(null, { status: 404, statusText: 'Not Found' });
  return { order };
};

const productName = (productId: string) =>
  products.find((product) => product.id === productId)?.name ?? productId;

export const OrderPage = () => {
  const { order } = useLoaderData<typeof orderLoader>();
  return (
    <section>
      <h1>Bestellung {order.id}</h1>
      <p>Status: {statusLabels[order.status]}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.quantity} × {productName(item.productId)} –{' '}
            {formatCents(item.priceCents)}
          </li>
        ))}
      </ul>
      <p>Summe: {formatCents(orderTotalCents(order.items))}</p>
      <Link to="/orders">Zur Bestellübersicht</Link>
    </section>
  );
};
