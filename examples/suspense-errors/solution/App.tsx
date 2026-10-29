import { useState } from 'react';
import { createOrderCache } from '../src/orderCache';
import { fakeOrderApi } from '../src/orders';
import { orderId as toOrderId, orders } from '../src/shop';
import { OrderDetailPage } from './OrderDetailPage';

const orderCache = createOrderCache(fakeOrderApi);

export const App = () => {
  const [orderId, setOrderId] = useState(orders[0].id);
  return (
    <main>
      <h1>Bestelldetails</h1>
      <label htmlFor="order">Bestellung</label>
      <select
        id="order"
        value={orderId}
        onChange={(event) => setOrderId(toOrderId(event.target.value))}
      >
        {orders.map((order) => (
          <option key={order.id} value={order.id}>
            {order.id}
          </option>
        ))}
        <option value="o9999">o9999 (unbekannt)</option>
      </select>
      <OrderDetailPage orderId={orderId} orderCache={orderCache} />
    </main>
  );
};
