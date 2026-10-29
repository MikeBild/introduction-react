export type Product = { id: string; name: string };

export const products: readonly Product[] = [
  { id: 'p1', name: 'Kaffeebohnen' },
  { id: 'p2', name: 'Handmühle' },
  { id: 'p3', name: 'Milchkännchen' },
  { id: 'p4', name: 'Kaffeefilter' },
  { id: 'p5', name: 'Teekanne' },
];

export const searchProducts = (query: string) =>
  products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );
