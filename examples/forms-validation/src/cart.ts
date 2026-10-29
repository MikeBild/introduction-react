import { productId, type ProductId } from './shop';

export type CartItem = { productId: ProductId; quantity: number };

// Der Steckschlüsselsatz ist ausverkauft – der Server lehnt ihn ab.
export const initialCart: readonly CartItem[] = [
  { productId: productId('p1'), quantity: 1 },
  { productId: productId('p2'), quantity: 1 },
];
