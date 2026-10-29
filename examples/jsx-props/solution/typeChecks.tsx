import { CartItemCard } from './CartItemCard';

// Wird nie ausgeführt – `tsc --noEmit` prüft nur, dass die Typen passen.
export const typeChecks = () => [
  <CartItemCard name="Tasse" priceInCents={900} />,
  <CartItemCard name="Tasse" priceInCents={900} variant="compact" />,
  <CartItemCard name="Tasse" priceInCents={900} quantity={3} note="Geschenk" />,
  // @ts-expect-error – "compakt" ist keine Variante
  <CartItemCard name="Tasse" priceInCents={900} variant="compakt" />,
  // @ts-expect-error – der Preis fehlt
  <CartItemCard name="Tasse" />,
];
