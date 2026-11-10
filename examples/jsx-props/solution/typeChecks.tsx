import { CartItemCard } from './CartItemCard';

// Never executed – `tsc --noEmit` only checks that the types fit.
export const typeChecks = () => [
  <CartItemCard name="Hammer" priceCents={1290} />,
  <CartItemCard name="Hammer" priceCents={1290} variant="compact" />,
  <CartItemCard
    name="Hammer"
    priceCents={1290}
    quantity={3}
    note="Für die Werkbank"
  />,
  // @ts-expect-error – "compakt" is not a variant
  <CartItemCard name="Hammer" priceCents={1290} variant="compakt" />,
  // @ts-expect-error – the price is missing
  <CartItemCard name="Hammer" />,
];
