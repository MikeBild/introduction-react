import { CartItemCard } from './CartItemCard';

// Übung: Entferne das `// ` am Anfang der Zeilen (in VS Code: markieren, Cmd/Strg + /).
// Danach muss `npm run typecheck` ohne Fehler laufen – erst dann stimmt der Vertrag.
// Diese Funktion wird nie ausgeführt, nur der Type Checker liest sie.
export const typeChecks = () => [
  // <CartItemCard name="Tasse" priceInCents={900} />,
  // <CartItemCard name="Tasse" priceInCents={900} variant="compact" />,
  // <CartItemCard name="Tasse" priceInCents={900} quantity={3} note="Geschenk" />,
  // // @ts-expect-error – "compakt" ist keine Variante
  // <CartItemCard name="Tasse" priceInCents={900} variant="compakt" />,
  // // @ts-expect-error – der Preis fehlt
  // <CartItemCard name="Tasse" />,
  <CartItemCard
    name="Tasse"
    priceInCents={900}
    quantity={1}
    variant="default"
    note=""
  />,
];
