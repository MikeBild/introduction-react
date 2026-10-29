import type { Product } from '../src/shop';

const isProduct = (value: unknown): value is Product =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  'name' in value &&
  'priceCents' in value &&
  'stock' in value;

export const fetchProducts = async (search: string, signal?: AbortSignal) => {
  const response = await fetch(
    `/api/products?q=${encodeURIComponent(search)}`,
    { signal }
  );
  // fetch wirft nur bei Netzwerkfehlern, nicht bei 404 oder 500.
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isProduct))
    throw new Error('Unerwartete Antwort');
  return data;
};
