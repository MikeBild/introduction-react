import type { Order } from './orders';
import {
  formatCents,
  orderTotalCents,
  products,
  type OrderStatus,
} from './shop';

const statusLabels: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  placed: 'Bestellt',
  paid: 'Bezahlt',
  shipped: 'Versandt',
  cancelled: 'Storniert',
};

const productName = (productId: string) =>
  products.find((product) => product.id === productId)?.name ?? productId;

// Reine Anzeige – weiß nichts vom Laden.
export const OrderView = ({ order }: { order: Order }) => (
  <section>
    <h2>Bestellung {order.id}</h2>
    <p>Status: {statusLabels[order.status]}</p>
    <ul>
      {order.items.map((item) => (
        <li key={item.productId}>
          {item.quantity} × {productName(item.productId)}
        </li>
      ))}
    </ul>
    <p>Summe: {formatCents(orderTotalCents(order.items))}</p>
  </section>
);
