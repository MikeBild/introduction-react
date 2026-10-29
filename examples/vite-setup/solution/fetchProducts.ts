import type { Product } from '@/shop';

// Relativer Pfad: Im Development leitet der Proxy von Vite /api an die
// Fake-API weiter, in Production liegt die API hinter demselben Origin.
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as Product[];
};
