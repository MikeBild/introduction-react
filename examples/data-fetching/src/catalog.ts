import { productId, products, type Product } from './shop.ts';

// Catalog of the workshop shop for the fake API: the products from shop.ts
// plus a few drills and hammers, so that searching is worthwhile.
export const catalog: readonly Product[] = [
  ...products,
  { id: productId('p5'), name: 'Akkubohrer', priceCents: 12900, stock: 6 },
  { id: productId('p6'), name: 'Bohrer-Set HSS', priceCents: 2490, stock: 15 },
  { id: productId('p7'), name: 'Schlosserhammer', priceCents: 1890, stock: 9 },
  { id: productId('p8'), name: 'Gummihammer', priceCents: 1290, stock: 0 },
  { id: productId('p9'), name: 'Bohrhammer', priceCents: 18900, stock: 3 },
];

export const searchCatalog = (search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  return catalog.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearch)
  );
};
