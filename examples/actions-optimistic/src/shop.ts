// Werkstatt-Shop: gemeinsame Domäne aller Workshop-Beispiele.
// Geld immer in ganzen Cent, IDs als Branded Types.

export type ProductId = string & { readonly __brand: 'ProductId' };
export type OrderId = string & { readonly __brand: 'OrderId' };
export type CustomerId = string & { readonly __brand: 'CustomerId' };

export type Product = {
  id: ProductId;
  name: string;
  priceCents: number;
  stock: number;
};

export type OrderStatus = 'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled';

export type OrderItem = {
  productId: ProductId;
  quantity: number;
  priceCents: number;
};

export type Order = {
  id: OrderId;
  customerId: CustomerId;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
};

export type Customer = { id: CustomerId; name: string; email: string };

export const productId = (id: string) => id as ProductId;
export const orderId = (id: string) => id as OrderId;
export const customerId = (id: string) => id as CustomerId;

export const orderTotalCents = (items: readonly OrderItem[]) =>
  items.reduce((sum, item) => sum + item.quantity * item.priceCents, 0);

const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export const formatCents = (cents: number) => euro.format(cents / 100);

export const products: readonly Product[] = [
  {
    id: productId('p1'),
    name: 'Drehmomentschlüssel',
    priceCents: 8990,
    stock: 4,
  },
  {
    id: productId('p2'),
    name: 'Steckschlüsselsatz',
    priceCents: 5490,
    stock: 0,
  },
  { id: productId('p3'), name: 'Werkstattwagen', priceCents: 24900, stock: 2 },
  {
    id: productId('p4'),
    name: 'Schraubendreher-Set',
    priceCents: 1990,
    stock: 12,
  },
];

export const customers: readonly Customer[] = [
  { id: customerId('c1'), name: 'Ada Schmidt', email: 'ada@example.com' },
  { id: customerId('c2'), name: 'Tom Weber', email: 'tom@example.com' },
];

export const orders: readonly Order[] = [
  {
    id: orderId('o1001'),
    customerId: customerId('c1'),
    items: [{ productId: productId('p1'), quantity: 1, priceCents: 8990 }],
    status: 'placed',
    createdAt: '2026-10-20T09:15:00Z',
  },
  {
    id: orderId('o1002'),
    customerId: customerId('c2'),
    items: [
      { productId: productId('p4'), quantity: 2, priceCents: 1990 },
      { productId: productId('p3'), quantity: 1, priceCents: 24900 },
    ],
    status: 'shipped',
    createdAt: '2026-10-22T14:30:00Z',
  },
  {
    id: orderId('o1003'),
    customerId: customerId('c1'),
    items: [{ productId: productId('p4'), quantity: 1, priceCents: 1990 }],
    status: 'draft',
    createdAt: '2026-10-27T08:05:00Z',
  },
];
