import { expect, it } from 'vitest';
import { mockFetchResponses, testProducts } from '../src/test-utils';
import { fetchJson } from './fetchJson';
import { isProductList } from './products';

it('liefert geprüfte Daten', async () => {
  mockFetchResponses({ body: testProducts });
  expect(await fetchJson('/api/products.json', isProductList)).toEqual({
    ok: true,
    data: testProducts,
  });
});

it('meldet einen HTTP-Fehler', async () => {
  mockFetchResponses({ status: 503, body: null });
  expect(await fetchJson('/api/products.json', isProductList)).toEqual({
    ok: false,
    error: 'http',
  });
});

it('meldet ungültige Daten', async () => {
  mockFetchResponses({ body: [{ id: 1 }] });
  expect(await fetchJson('/api/products.json', isProductList)).toEqual({
    ok: false,
    error: 'invalid',
  });
});
