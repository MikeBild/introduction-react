import { useContext } from 'react';
import { CartContext } from './cart';

export const CartBadge = () => {
  const { items } = useContext(CartContext);
  return <p aria-live="polite">Warenkorb: {items.length} Artikel</p>;
};
