import { formatCents, orders, orderTotalCents } from './shop';

// Wird erst bei Bedarf geladen – such nach dem Build seinen eigenen Chunk in dist/assets.
// Stell dir hier eine schwere Chart-Library vor.
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
