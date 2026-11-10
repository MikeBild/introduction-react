import { productId, type ProductId } from './shop';

export type CartItem = { productId: ProductId; quantity: number };

// The socket wrench set is sold out – the server rejects it.
export const initialCart: readonly CartItem[] = [
  { productId: productId('p1'), quantity: 1 },
  { productId: productId('p2'), quantity: 1 },
];
