import { createContext, use, useState, type ReactNode } from 'react';

import type { OrderItem, Product, ProductId } from '../src/shop';

export type CartItem = OrderItem;

type CartContextValue = {
  items: readonly CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: ProductId) => void;
};

// Kein Default-Objekt: null heißt „kein Provider“.
const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const addItem = (product: Product) =>
    setItems((currentItems) => [
      ...currentItems,
      { productId: product.id, quantity: 1, priceCents: product.priceCents },
    ]);
  const removeItem = (productId: ProductId) =>
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  // React 19: der Context selbst ist der Provider.
  return (
    <CartContext value={{ items, addItem, removeItem }}>{children}</CartContext>
  );
};

// Einziger Zugang zum Context – mit Fehlermeldung statt stiller No-ops.
export const useCart = (): CartContextValue => {
  const cart = use(CartContext);
  if (!cart)
    throw new Error(
      'useCart muss innerhalb von <CartProvider> aufgerufen werden'
    );
  return cart;
};
