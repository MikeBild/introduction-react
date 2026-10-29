import { productId, products, type Product } from './shop.ts';

// Katalog des Werkstatt-Shops für die Fake-API: die Produkte aus shop.ts
// plus ein paar Bohrer und Hämmer, damit sich die Suche lohnt.
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
