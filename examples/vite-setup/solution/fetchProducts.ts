import { HttpError } from '@/errorText';
import type { Product } from '@/shop';

// Relative path: in development Vite's proxy forwards /api to the
// fake API, in production the API sits behind the same origin.
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new HttpError(response.status);
  return (await response.json()) as Product[];
};
