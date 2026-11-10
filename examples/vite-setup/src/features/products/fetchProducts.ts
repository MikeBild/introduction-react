import { HttpError } from '../../errorText';
import type { Product } from '../../shop';

// The fake API runs on port 3000, the dev server on 5173.
// A second origin – and the fake API sends no CORS headers.
const API_URL = 'http://localhost:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new HttpError(response.status);
  return (await response.json()) as Product[];
};
