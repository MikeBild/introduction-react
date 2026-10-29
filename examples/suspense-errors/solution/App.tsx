import { useState } from 'react';
import { createOrderCache } from '../src/orderCache';
import { fakeOrderApi } from '../src/orders';
import { OrderDetailPage } from './OrderDetailPage';

const orderCache = createOrderCache(fakeOrderApi);

export const App = () => {
  const [orderId, setOrderId] = useState('o-1');
  return (
    <main>
      <h1>Bestelldetails</h1>
      <label htmlFor="order">Bestellung</label>
      <select
        id="order"
        value={orderId}
        onChange={(event) => setOrderId(event.target.value)}
      >
        <option value="o-1">o-1</option>
        <option value="o-2">o-2 (unbekannt)</option>
      </select>
      <OrderDetailPage orderId={orderId} orderCache={orderCache} />
    </main>
  );
};
