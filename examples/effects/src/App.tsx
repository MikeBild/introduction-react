import { useState } from 'react';
import { customers, loadOrders } from './ordersApi';
import { OrderPanel } from './OrderPanel';

export const App = () => {
  const [customerIndex, setCustomerIndex] = useState(0);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const customer = customers[customerIndex % customers.length];
  return (
    <main>
      <h1>Kunden</h1>
      <button type="button" onClick={() => setCustomerIndex((i) => i + 1)}>
        Nächster Kunde
      </button>
      <button type="button" onClick={() => setIsPanelVisible((v) => !v)}>
        Panel ein-/ausblenden
      </button>
      {isPanelVisible && (
        <OrderPanel
          customer={customer}
          loadOrders={loadOrders}
          onReorder={(orderId) => console.info('Erneut bestellt:', orderId)}
        />
      )}
    </main>
  );
};
