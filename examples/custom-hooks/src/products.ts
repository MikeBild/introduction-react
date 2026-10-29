import { products } from './shop';

export type { Product } from './shop';

export const searchProducts = (query: string) =>
  products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );
