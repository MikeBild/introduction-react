import {
  Link,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from 'react-router';
import { fetchOrders } from '../src/ordersApi';
import { readStatus, statusLabels, statuses } from '../src/orderStatus';

export const ordersLoader = async ({ request }: LoaderFunctionArgs) => {
  const status = readStatus(new URL(request.url).searchParams.get('status'));
  // request.signal bricht veraltete Navigationen ab.
  const orders = await fetchOrders(status, request.signal);
  return { orders };
};

const StatusFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = readStatus(searchParams.get('status'));
  return (
    <>
      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(event) =>
          setSearchParams(
            event.target.value === 'all' ? {} : { status: event.target.value }
          )
        }
      >
        <option value="all">Alle</option>
        {statuses.map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>
    </>
  );
};

export const OrdersPage = () => {
  const { orders } = useLoaderData<typeof ordersLoader>();
  return (
    <section>
      <h1>Bestellungen</h1>
      <StatusFilter />
      {orders.length === 0 ? (
        <p>Keine Bestellungen mit diesem Status</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/orders/${order.id}`}>Bestellung {order.id}</Link>{' '}
              {statusLabels[order.status]}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
