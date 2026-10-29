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

it('zeigt alle Bestellungen', async () => {
  renderAt('/orders');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /^Bestellung / })).toHaveLength(3);
});

it('filtert per Search Param', async () => {
  renderAt('/orders?status=placed');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /^Bestellung / })).toHaveLength(1);
});

it('ignoriert unbekannte Status-Werte', async () => {
  renderAt('/orders?status=unbekannt');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getByLabelText('Status')).toHaveValue('all');
});

it('schreibt den Filter in die URL und lädt neu', async () => {
  const router = renderAt('/orders');
  await screen.findByText('Bestellung o1001');
  await userEvent.selectOptions(screen.getByLabelText('Status'), 'draft');
  await waitForElementToBeRemoved(() => screen.queryByText('Bestellung o1001'));
  expect(screen.getByText('Bestellung o1003')).toBeInTheDocument();
  expect(router.state.location.search).toBe('?status=draft');
});

it('lädt das Detail per Path Param', async () => {
  renderAt('/orders/o1002');
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
  expect(screen.getByText('Summe: 288,80 €')).toBeInTheDocument();
});

it('zeigt 404 in der Route, Navigation bleibt', async () => {
  renderAt('/orders/o9999');
  expect(await screen.findByRole('alert')).toHaveTextContent('404 Not Found');
  expect(screen.getByRole('link', { name: 'Produkte' })).toBeInTheDocument();
});

it('fängt Loader-Fehler in der ErrorBoundary der Route', async () => {
  vi.spyOn(ordersApi, 'fetchOrders').mockRejectedValue(new Error('Netz weg'));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  renderAt('/orders');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Unerwarteter Fehler'
  );
});
