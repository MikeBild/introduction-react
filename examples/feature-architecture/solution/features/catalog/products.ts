import { productId, type ProductId } from '../../shared/ids';

export type Product = {
  id: ProductId;
  name: string;
  priceCents: number;
  stock: number;
};

const products: readonly Product[] = [
  {
    id: productId('p1'),
    name: 'Drehmomentschlüssel',
    priceCents: 8990,
    stock: 4,
  },
  { id: productId('p3'), name: 'Werkstattwagen', priceCents: 24900, stock: 2 },
  {
    id: productId('p4'),
    name: 'Schraubendreher-Set',
    priceCents: 1990,
    stock: 12,
  },
];

export const listProducts = () => products;

export const findProductById = (id: ProductId) =>
  products.find((product) => product.id === id);
