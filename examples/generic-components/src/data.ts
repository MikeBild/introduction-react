export type Customer = {
  id: string;
  name: string;
  email: string;
  revenueInCents: number;
};

export type Product = { sku: string; title: string; isInStock: boolean };

export const customers: readonly Customer[] = [
  {
    id: 'c1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    revenueInCents: 129000,
  },
  {
    id: 'c2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    revenueInCents: 4900,
  },
  {
    id: 'c3',
    name: 'Alan Turing',
    email: 'alan@example.com',
    revenueInCents: 65800,
  },
];

export const products: readonly Product[] = [
  { sku: 'K-01', title: 'Kaffeebohnen', isInStock: true },
  { sku: 'M-02', title: 'Handmühle', isInStock: false },
];

export const formatPrice = (amountInCents: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    amountInCents / 100
  );
