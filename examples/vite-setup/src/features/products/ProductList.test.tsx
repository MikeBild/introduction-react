import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { products } from '../../shop';
import { ProductList } from './ProductList';

const mockApi = () =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(products));

it('zeigt die Produkte mit Preis', async () => {
  mockApi();
  render(<ProductList />);
  expect(await screen.findByText(/Drehmomentschlüssel/)).toHaveTextContent(
    /89,90/
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(products.length);
});

it('zeigt HTTP-Fehler als Meldung', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(null, { status: 502 })
  );
  render(<ProductList />);
  expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 502');
});

// Übung: .skip entfernen
it.skip('fragt die API unter /api/products auf dem eigenen Origin an', async () => {
  const fetchSpy = mockApi();
  render(<ProductList />);
  await screen.findAllByRole('listitem');
  expect(fetchSpy).toHaveBeenCalledWith('/api/products');
});
