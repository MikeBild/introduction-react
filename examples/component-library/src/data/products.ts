export type Product = {
  id: string;
  name: string;
  priceInCents: number;
  isNew: boolean;
};

export const products: readonly Product[] = [
  { id: 'p1', name: 'Kaffeebohnen', priceInCents: 1290, isNew: false },
  { id: 'p2', name: 'Handmühle', priceInCents: 4900, isNew: true },
  { id: 'p3', name: 'Milchkännchen', priceInCents: 1990, isNew: false },
  { id: 'p4', name: 'Kaffeefilter', priceInCents: 390, isNew: true },
];

export const searchProducts = (searchText: string) => {
  const normalizedSearchText = searchText.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchText)
  );
};
