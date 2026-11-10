import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { products } from '@/shop';
import { ProductList } from './ProductList';

const mockApi = () =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(products));

it('shows the products with price', async () => {
  mockApi();
  render(<ProductList />);
  expect(await screen.findByText(/Drehmomentschlüssel/)).toHaveTextContent(
    /89,90/
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(products.length);
});

it('shows HTTP errors as a message', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(null, { status: 502 })
  );
  render(<ProductList />);
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Produkte nicht geladen. Der Server hat gerade ein Problem.'
  );
});

it('requests the API at /api/products on its own origin', async () => {
  const fetchSpy = mockApi();
  render(<ProductList />);
  await screen.findAllByRole('listitem');
  expect(fetchSpy).toHaveBeenCalledWith('/api/products');
});
