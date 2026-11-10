import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { expect, it, vi } from 'vitest';
import * as ordersApi from '../src/ordersApi';
import { routes } from './routes';

const renderAt = (url: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [url] });
  render(<RouterProvider router={router} />);
  return router;
};

it('shows all orders', async () => {
  renderAt('/orders');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /^Bestellung / })).toHaveLength(3);
});

it('filters via Search Param', async () => {
  renderAt('/orders?status=placed');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /^Bestellung / })).toHaveLength(1);
});

it('ignores unknown status values', async () => {
  renderAt('/orders?status=unbekannt');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getByLabelText('Status')).toHaveValue('all');
});

it('writes the filter to the URL and reloads', async () => {
  const router = renderAt('/orders');
  await screen.findByText('Bestellung o1001');
  await userEvent.selectOptions(screen.getByLabelText('Status'), 'draft');
  await waitForElementToBeRemoved(() => screen.queryByText('Bestellung o1001'));
  expect(screen.getByText('Bestellung o1003')).toBeInTheDocument();
  expect(router.state.location.search).toBe('?status=draft');
});

it('loads the detail via Path Param', async () => {
  renderAt('/orders/o1002');
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
  expect(screen.getByText('Summe: 288,80 €')).toBeInTheDocument();
});

it('shows 404 inside the route, navigation stays', async () => {
  renderAt('/orders/o9999');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Das haben wir nicht gefunden.'
  );
  expect(screen.getByRole('link', { name: 'Produkte' })).toBeInTheDocument();
});

it('catches loader errors in the route ErrorBoundary', async () => {
  vi.spyOn(ordersApi, 'fetchOrders').mockRejectedValue(new Error('Netz weg'));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  renderAt('/orders');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Netz weg. Versuch es noch einmal.'
  );
});
