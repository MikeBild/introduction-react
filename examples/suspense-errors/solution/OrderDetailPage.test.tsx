import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { createOrderCache } from '../src/orderCache';
import { OrderDetailPage } from './OrderDetailPage';
import type { Order } from '../src/orders';
import { createTestApi, testOrder } from '../src/testApi';

beforeEach(() => {
  // React logs caught render errors – in the test that is just noise.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

// With use() the Component suspends. React 19 then requires an awaited act().
const renderPage = (api = createTestApi()) =>
  act(async () => {
    render(
      <OrderDetailPage
        orderId={testOrder.id}
        orderCache={createOrderCache(api)}
      />
    );
  });

// The retry suspends too – that is why the click runs inside an awaited act().
const clickAndWait = (button: HTMLElement) =>
  act(async () => {
    await userEvent.click(button);
  });

it('shows the loading state first, then the order', async () => {
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

it('catches the error when the order does not load', async () => {
  const api = createTestApi();
  api.fetchOrder.mockRejectedValue(
    new Error('Bestellung o1001 nicht gefunden')
  );
  await renderPage(api);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

it('reloads via retry after an error', async () => {
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

it('shows the order even when the shipment status is missing', async () => {
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

it('reloads the shipment status via retry without reloading the order', async () => {
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
