import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { createOrderCache } from '../src/orderCache';
import { OrderDetailPage } from './OrderDetailPage';
import type { Order } from '../src/orders';
import { createTestApi, testOrder } from '../src/testApi';

beforeEach(() => {
  // React loggt gefangene Render Errors – im Test ist das nur Rauschen.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

// Mit use() suspendiert die Component. React 19 verlangt dann ein awaited act().
const renderPage = (api = createTestApi()) =>
  act(async () => {
    render(
      <OrderDetailPage
        orderId={testOrder.id}
        orderCache={createOrderCache(api)}
      />
    );
  });

// Auch der Retry suspendiert – deshalb läuft der Klick in einem awaited act().
const clickAndWait = (button: HTMLElement) =>
  act(async () => {
    await userEvent.click(button);
  });

it('zeigt erst den Loading State, dann die Bestellung', async () => {
  const api = createTestApi();
  const pendingOrder = Promise.withResolvers<Order>();
  api.fetchOrder.mockReturnValue(pendingOrder.promise);
  await renderPage(api);
  expect(screen.getByText('Bestellung lädt …')).toBeInTheDocument();
  await act(async () => pendingOrder.resolve(testOrder));
  expect(
    screen.getByRole('heading', { name: 'Bestellung o1001' })
  ).toBeInTheDocument();
  expect(screen.getByText('Versand: Unterwegs')).toBeInTheDocument();
});

it('fängt den Error, wenn die Bestellung nicht lädt', async () => {
  const api = createTestApi();
  api.fetchOrder.mockRejectedValue(
    new Error('Bestellung o1001 nicht gefunden')
  );
  await renderPage(api);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

it('lädt nach einem Error per Retry neu', async () => {
  const api = createTestApi();
  api.fetchOrder.mockRejectedValueOnce(new Error('Netzwerk weg'));
  await renderPage(api);
  expect(screen.getByRole('alert')).toHaveTextContent('Netzwerk weg');
  await clickAndWait(screen.getByRole('button', { name: 'Erneut laden' }));
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1001' })
  ).toBeInTheDocument();
  expect(api.fetchOrder).toHaveBeenCalledTimes(2);
});

it('zeigt die Bestellung auch dann, wenn der Versandstatus fehlt', async () => {
  const api = createTestApi();
  api.fetchShipment.mockRejectedValue(new Error('Tracking down'));
  await renderPage(api);
  expect(
    screen.getByRole('heading', { name: 'Bestellung o1001' })
  ).toBeInTheDocument();
  expect(
    screen.getByText('Versandstatus ist gerade nicht verfügbar.', {
      exact: false,
    })
  ).toBeInTheDocument();
});

it('lädt den Versandstatus per Retry nach, ohne die Bestellung neu zu laden', async () => {
  const api = createTestApi();
  api.fetchShipment.mockRejectedValueOnce(new Error('Tracking down'));
  await renderPage(api);
  await clickAndWait(
    screen.getByRole('button', { name: 'Versandstatus erneut laden' })
  );
  expect(await screen.findByText('Versand: Unterwegs')).toBeInTheDocument();
  expect(api.fetchOrder).toHaveBeenCalledTimes(1);
  expect(api.fetchShipment).toHaveBeenCalledTimes(2);
});
