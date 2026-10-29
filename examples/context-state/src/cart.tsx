import { createContext, useState, type ReactNode } from 'react';

import type { OrderItem, Product, ProductId } from './shop';

export type CartItem = OrderItem;

type CartContextValue = {
  items: readonly CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: ProductId) => void;
};

// Übung react-context-state: Das Default-Objekt versteckt Fehler.
// Ohne Provider tut addItem einfach nichts – und niemand merkt es.
export const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

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
  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
