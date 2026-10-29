import { createContext, useState, type ReactNode } from 'react';

export type CartItem = { productId: string; name: string };

type CartContextValue = {
  items: readonly CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
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
  const addItem = (item: CartItem) =>
    setItems((currentItems) => [...currentItems, item]);
  const removeItem = (productId: string) =>
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
