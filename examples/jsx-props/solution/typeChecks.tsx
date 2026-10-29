import { CartItemCard } from './CartItemCard';

// Wird nie ausgeführt – `tsc --noEmit` prüft nur, dass die Typen passen.
export const typeChecks = () => [
  <CartItemCard name="Hammer" priceCents={1290} />,
  <CartItemCard name="Hammer" priceCents={1290} variant="compact" />,
  <CartItemCard
    name="Hammer"
    priceCents={1290}
    quantity={3}
    note="Für die Werkbank"
  />,
  // @ts-expect-error – "compakt" ist keine Variante
  <CartItemCard name="Hammer" priceCents={1290} variant="compakt" />,
  // @ts-expect-error – der Preis fehlt
  <CartItemCard name="Hammer" />,
];
