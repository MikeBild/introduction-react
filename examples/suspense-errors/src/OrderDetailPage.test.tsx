import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { createOrderCache } from './orderCache';
import { OrderDetailPage } from './OrderDetailPage';
import type { Order } from './orders';
import { createTestApi, testOrder } from './testApi';

beforeEach(() => {
  // React loggt gefangene Render Errors – im Test ist das nur Rauschen.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

// Mit use() suspendiert die Component. React 19 verlangt dann ein awaited act().
const renderPage = (api = createTestApi()) =>
  act(async () => {
    render(
      <OrderDetailPage orderId="o-1" orderCache={createOrderCache(api)} />
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
    screen.getByRole('heading', { name: 'Bestellung o-1' })
  ).toBeInTheDocument();
  expect(screen.getByText('Versand: Unterwegs')).toBeInTheDocument();
});

it('fängt den Error, wenn die Bestellung nicht lädt', async () => {
  const api = createTestApi();
  api.fetchOrder.mockRejectedValue(new Error('Bestellung o-1 nicht gefunden'));
  await renderPage(api);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

// Übung: .skip entfernen
it.skip('lädt nach einem Error per Retry neu', async () => {
  const api = createTestApi();
  api.fetchOrder.mockRejectedValueOnce(new Error('Netzwerk weg'));
  await renderPage(api);
  expect(screen.getByRole('alert')).toHaveTextContent('Netzwerk weg');
  await clickAndWait(screen.getByRole('button', { name: 'Erneut laden' }));
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o-1' })
  ).toBeInTheDocument();
  expect(api.fetchOrder).toHaveBeenCalledTimes(2);
});

it.skip('zeigt die Bestellung auch dann, wenn der Versandstatus fehlt', async () => {
  const api = createTestApi();
  api.fetchShipment.mockRejectedValue(new Error('Tracking down'));
  await renderPage(api);
  expect(
    screen.getByRole('heading', { name: 'Bestellung o-1' })
  ).toBeInTheDocument();
  expect(
    screen.getByText('Versandstatus ist gerade nicht verfügbar.', {
      exact: false,
    })
  ).toBeInTheDocument();
});
