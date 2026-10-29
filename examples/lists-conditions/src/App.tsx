import { useState } from 'react';
import { OrderOverview } from './OrderOverview';
import { type OrdersState } from './orders';
import { customerId, orderId, orders, productId } from './shop';

const demoStates: Record<string, OrdersState> = {
  Loading: { status: 'loading' },
  Error: { status: 'error', message: 'Der Server antwortet nicht.' },
  Empty: { status: 'success', orders: [] },
  Daten: { status: 'success', orders },
};

export const App = () => {
  const [state, setState] = useState<OrdersState>(demoStates.Daten);
  const addOrderOnTop = () =>
    setState((currentState) =>
      currentState.status === 'success'
        ? {
            status: 'success',
            orders: [
              {
                id: orderId(`o${1001 + currentState.orders.length}`),
                customerId: customerId('c2'),
                items: [
                  { productId: productId('p4'), quantity: 1, priceCents: 1990 },
                ],
                status: 'draft',
                createdAt: new Date().toISOString(),
              },
              ...currentState.orders,
            ],
          }
        : currentState
    );

  return (
    <main>
      <h1>Bestellungen</h1>
      <nav>
        {Object.entries(demoStates).map(([label, demoState]) => (
          <button key={label} type="button" onClick={() => setState(demoState)}>
            {label}
          </button>
        ))}
        <button type="button" onClick={addOrderOnTop}>
          Neue Bestellung oben einfügen
        </button>
      </nav>
      <OrderOverview state={state} />
    </main>
  );
};
