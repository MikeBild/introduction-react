import { useCart } from './cart';

export const CartBadge = () => {
  const { items } = useCart();
  return <p aria-live="polite">Warenkorb: {items.length} Artikel</p>;
};
