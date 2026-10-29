import type { Product } from '../../shop';

// Die Fake-API läuft auf Port 3000, der Dev Server auf 5173.
// Ein zweiter Origin – und die Fake-API schickt keine CORS-Header.
const API_URL = 'http://localhost:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as Product[];
};
