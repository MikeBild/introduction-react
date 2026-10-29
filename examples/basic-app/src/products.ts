export type Product = {
  id: string;
  name: string;
  priceInCents: number;
  isInStock: boolean;
};

export const products: readonly Product[] = [
  { id: 'p1', name: 'Kaffeebohnen', priceInCents: 1290, isInStock: true },
  { id: 'p2', name: 'Handmühle', priceInCents: 4900, isInStock: false },
  { id: 'p3', name: 'Milchkännchen', priceInCents: 1990, isInStock: true },
  { id: 'p4', name: 'Kaffeefilter', priceInCents: 390, isInStock: true },
];
