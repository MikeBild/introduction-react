import { HttpError } from './errorText';
import type { PlaceOrderInput } from './placeOrderInput';
import type { Order, Product } from './shop';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isProduct = (value: unknown): value is Product =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.name === 'string' &&
  typeof value.priceCents === 'number' &&
  typeof value.stock === 'number';

const isOrder = (value: unknown): value is Order =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.status === 'string' &&
  Array.isArray(value.items);

const readJson = async (response: Response): Promise<unknown> => {
  // fetch wirft nur bei Netzwerkfehlern, nicht bei 404 oder 500.
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
};

export const fetchProducts = async (search: string, signal?: AbortSignal) => {
  const data = await readJson(
    await fetch(`/api/products?q=${encodeURIComponent(search)}`, { signal })
  );
  if (!Array.isArray(data) || !data.every(isProduct))
    throw new Error('Unerwartete Antwort vom Server');
  return data;
};

export const fetchOrders = async (signal?: AbortSignal) => {
  const data = await readJson(await fetch('/api/orders', { signal }));
  if (!Array.isArray(data) || !data.every(isOrder))
    throw new Error('Unerwartete Antwort vom Server');
  return data;
};

export const placeOrder = async (input: PlaceOrderInput) => {
  const data = await readJson(
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  );
  if (!isOrder(data)) throw new Error('Unerwartete Antwort vom Server');
  return data;
};
