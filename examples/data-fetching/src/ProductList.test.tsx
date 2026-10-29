import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw/http';
import { expect, it } from 'vitest';
import { server } from './mocks/server';
import { ProductList } from './ProductList';
import { renderWithClient } from './test-utils';

it('lädt die Produktliste', async () => {
  renderWithClient(<ProductList />);
  expect(await screen.findByText(/Kaffeebohnen/)).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

it('fügt ein Produkt hinzu', async () => {
  renderWithClient(<ProductList />);
  await screen.findByText(/Kaffeebohnen/);
  await userEvent.type(screen.getByLabelText('Name'), 'Milchkännchen');
  await userEvent.type(screen.getByLabelText('Preis in Cent'), '1990');
  await userEvent.click(screen.getByRole('button', { name: 'Hinzufügen' }));
  expect(await screen.findByText(/Milchkännchen/)).toBeInTheDocument();
});

// Übung: .skip entfernen, sobald useQuery und das zod-Schema stehen
it.skip('meldet ungültige Daten vom Server', async () => {
  server.use(
    http.get('/api/products', () =>
      HttpResponse.json([{ id: 'p1', name: null, priceInCents: '12' }])
    )
  );
  renderWithClient(<ProductList />);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produktdaten sind ungültig.'
  );
});

it.skip('meldet einen Server Error', async () => {
  server.use(
    http.get('/api/products', () =>
      HttpResponse.json({ message: 'Kaputt' }, { status: 500 })
    )
  );
  renderWithClient(<ProductList />);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produkte konnten nicht geladen werden.'
  );
});
