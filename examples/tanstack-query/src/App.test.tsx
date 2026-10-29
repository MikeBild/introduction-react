import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';
import { mockShopApi } from './test-utils';

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

it('zeigt Produkte, Treffer und Bestellungen', async () => {
  mockShopApi();
  render(<App />);
  expect(await screen.findByText('9 Treffer')).toBeInTheDocument();
  expect(
    await screen.findByText(/Bestellung o1001 – Bestellt/)
  ).toBeInTheDocument();
});

it('zeigt nach dem Bestellen die neue Bestellung', async () => {
  mockShopApi();
  render(<App />);
  await userEvent.click(
    await screen.findByRole('button', { name: 'Akkubohrer bestellen' })
  );
  expect(
    await screen.findByText('Bestellung o1004 – Bestellt – 129,00 €')
  ).toBeInTheDocument();
});

// Übung: .skip entfernen
it.skip('lädt die Produkte für Liste und Treffer nur einmal', async () => {
  const api = mockShopApi();
  render(<App />);
  await screen.findByText('9 Treffer');
  await screen.findByRole('button', { name: 'Akkubohrer bestellen' });
  expect(api.requestCount('GET', '/api/products?q=')).toBe(1);
});

it.skip('holt einen schon geladenen Suchtext aus dem Cache', async () => {
  const api = mockShopApi();
  render(<App />);
  await screen.findByText('9 Treffer');
  typeSearch('hammer');
  await screen.findByText('3 Treffer');
  typeSearch('');
  expect(await screen.findByText('9 Treffer')).toBeInTheDocument();
  expect(api.requestCount('GET', '/api/products?q=')).toBe(1);
});
