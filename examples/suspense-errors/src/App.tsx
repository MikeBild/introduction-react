import { useState } from 'react';
import { createOrderCache } from './orderCache';
import { OrderDetailPage } from './OrderDetailPage';
import { fakeOrderApi } from './orders';

// Ein Cache für die ganze App – außerhalb jeder Component.
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
      <OrderDetailPage
        key={orderId}
        orderId={orderId}
        orderCache={orderCache}
      />
    </main>
  );
};
