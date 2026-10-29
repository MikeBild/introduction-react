import { useReducer } from 'react';
import { orderReducer } from './orderReducer';
import {
  customerId,
  formatCents,
  orderId,
  orderTotalCents,
  products,
  type Order,
} from './shop';

const emptyDraft: Order = {
  id: orderId('o1004'),
  customerId: customerId('c1'),
  items: [],
  status: 'draft',
  createdAt: '2026-10-29T10:00:00Z',
};

const [screwdriverSet] = products.filter((product) => product.id === 'p4');

export const OrderStatusPanel = () => {
  const [order, dispatch] = useReducer(orderReducer, emptyDraft);
  return (
    <section>
      <h2>Bestellung {order.id}</h2>
      <p>
        Status: <output>{order.status}</output> · {order.items.length}{' '}
        Positionen · {formatCents(orderTotalCents(order.items))}
      </p>
      {screwdriverSet && (
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'itemAdded',
              item: {
                productId: screwdriverSet.id,
                quantity: 1,
                priceCents: screwdriverSet.priceCents,
              },
            })
          }
        >
          {screwdriverSet.name} hinzufügen
        </button>
      )}
      <button type="button" onClick={() => dispatch({ type: 'placed' })}>
        Bestellen
      </button>
      <button type="button" onClick={() => dispatch({ type: 'paid' })}>
        Bezahlen
      </button>
      <button type="button" onClick={() => dispatch({ type: 'shipped' })}>
        Versenden
      </button>
      <button type="button" onClick={() => dispatch({ type: 'cancelled' })}>
        Stornieren
      </button>
    </section>
  );
};
