import { HttpError } from '@/errorText';
import type { Product } from '@/shop';

// Relativer Pfad: Im Development leitet der Proxy von Vite /api an die
// Fake-API weiter, in der Produktion liegt die API hinter demselben Origin.
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new HttpError(response.status);
  return (await response.json()) as Product[];
};
