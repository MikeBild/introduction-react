import { useState } from 'react';
import { OrderOverview } from './OrderOverview';
import { sampleOrders, type OrdersState } from './orders';

const demoStates: Record<string, OrdersState> = {
  Loading: { status: 'loading' },
  Error: { status: 'error', message: 'Der Server antwortet nicht.' },
  Empty: { status: 'success', orders: [] },
  Daten: { status: 'success', orders: sampleOrders },
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
                id: crypto.randomUUID(),
                number: 1000 + currentState.orders.length + 1,
                customerName: 'Neue Kundin',
                totalInCents: 990,
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
