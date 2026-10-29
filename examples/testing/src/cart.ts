import { productId, type ProductId } from './shop';

export type CartItem = { productId: ProductId; quantity: number };

export const initialCart: readonly CartItem[] = [
  { productId: productId('p1'), quantity: 1 },
  { productId: productId('p4'), quantity: 2 },
];
