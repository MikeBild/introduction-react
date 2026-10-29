export type Product = { id: string; name: string; priceInCents: number };

const products: readonly Product[] = [
  { id: 'p1', name: 'Coffee beans', priceInCents: 1290 },
  { id: 'p2', name: 'Grinder', priceInCents: 4900 },
];

export const listProducts = () => products;

export const findProductById = (productId: string) =>
  products.find((product) => product.id === productId);
