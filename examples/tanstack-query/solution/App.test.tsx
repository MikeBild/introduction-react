import { QueryClient } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { mockShopApi } from '../src/test-utils';
import { App } from './App';

// Pro Test ein frischer QueryClient ohne Retries – Tests teilen keinen Cache.
const renderApp = () =>
  render(
    <App
      queryClient={
        new QueryClient({
          defaultOptions: {
            queries: { retry: false, staleTime: 30_000 },
            mutations: { retry: false },
          },
        })
      }
    />
  );

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

it('zeigt Produkte, Treffer und Bestellungen', async () => {
  mockShopApi();
  renderApp();
  expect(await screen.findByText('9 Treffer')).toBeInTheDocument();
  expect(
    await screen.findByText(/Bestellung o1001 – Bestellt/)
  ).toBeInTheDocument();
});

it('lädt die Produkte für Liste und Treffer nur einmal', async () => {
  const api = mockShopApi();
  renderApp();
  await screen.findByText('9 Treffer');
  await screen.findByRole('button', { name: 'Akkubohrer bestellen' });
  expect(api.requestCount('GET', '/api/products?q=')).toBe(1);
});

it('holt einen schon geladenen Suchtext aus dem Cache', async () => {
  const api = mockShopApi();
  renderApp();
  await screen.findByText('9 Treffer');
  typeSearch('hammer');
  await screen.findByText('3 Treffer');
  typeSearch('');
  expect(await screen.findByText('9 Treffer')).toBeInTheDocument();
  expect(api.requestCount('GET', '/api/products?q=')).toBe(1);
});

it('invalidiert die Bestellübersicht nach dem Bestellen', async () => {
  const api = mockShopApi();
  renderApp();
  await userEvent.click(
    await screen.findByRole('button', { name: 'Akkubohrer bestellen' })
  );
  expect(
    await screen.findByText('Bestellung o1004 – Bestellt – 129,00 €')
  ).toBeInTheDocument();
  expect(api.requestCount('POST', '/api/orders')).toBe(1);
  expect(api.requestCount('GET', '/api/orders')).toBe(2);
});

it('zeigt HTTP-Fehler der Query', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    Response.json({ message: 'kaputt' }, { status: 500 })
  );
  renderApp();
  expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
  expect(screen.getAllByRole('alert')[0]).toHaveTextContent('HTTP 500');
});
