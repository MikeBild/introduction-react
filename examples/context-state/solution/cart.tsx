import { createContext, use, useState, type ReactNode } from 'react';

export type CartItem = { productId: string; name: string };

type CartContextValue = {
  items: readonly CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
};

// Kein Default-Objekt: null heißt „kein Provider“.
const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const addItem = (item: CartItem) =>
    setItems((currentItems) => [...currentItems, item]);
  const removeItem = (productId: string) =>
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
