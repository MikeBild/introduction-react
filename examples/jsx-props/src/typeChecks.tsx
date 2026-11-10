import { CartItemCard } from './CartItemCard';

// Exercise: remove the `// ` at the start of the lines (in VS Code: select them, Cmd/Ctrl + /).
// After that, `npm run typecheck` must run without errors – only then is the contract right.
// This function is never executed, only the type checker reads it.
export const typeChecks = () => [
  // <CartItemCard name="Hammer" priceCents={1290} />,
  // <CartItemCard name="Hammer" priceCents={1290} variant="compact" />,
  // <CartItemCard name="Hammer" priceCents={1290} quantity={3} note="Für die Werkbank" />,
  // // @ts-expect-error – "compakt" is not a variant
  // <CartItemCard name="Hammer" priceCents={1290} variant="compakt" />,
  // // @ts-expect-error – the price is missing
  // <CartItemCard name="Hammer" />,
  <CartItemCard
    name="Hammer"
    priceCents={1290}
    quantity={1}
    variant="default"
    note=""
  />,
];
