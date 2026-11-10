import { formatCents, orders, orderTotalCents } from './shop';

// Loaded only on demand – after the build, look for its own chunk in dist/assets.
// Imagine a heavy chart library here.
const ReportsPage = () => (
  <section>
    <h2>Bestell-Reports</h2>
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.id}: {order.status},{' '}
          {formatCents(orderTotalCents(order.items))}
        </li>
      ))}
    </ul>
  </section>
);

export default ReportsPage;
