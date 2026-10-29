import { CartItemCard } from './CartItemCard';

// Übung: Entferne das `// ` am Anfang der Zeilen (in VS Code: markieren, Cmd/Strg + /).
// Danach muss `npm run typecheck` ohne Fehler laufen – erst dann stimmt der Vertrag.
// Diese Funktion wird nie ausgeführt, nur der Type Checker liest sie.
export const typeChecks = () => [
  // <CartItemCard name="Hammer" priceCents={1290} />,
  // <CartItemCard name="Hammer" priceCents={1290} variant="compact" />,
  // <CartItemCard name="Hammer" priceCents={1290} quantity={3} note="Für die Werkbank" />,
  // // @ts-expect-error – "compakt" ist keine Variante
  // <CartItemCard name="Hammer" priceCents={1290} variant="compakt" />,
  // // @ts-expect-error – der Preis fehlt
  // <CartItemCard name="Hammer" />,
  <CartItemCard
    name="Hammer"
    priceCents={1290}
    quantity={1}
    variant="default"
    note=""
  />,
];
