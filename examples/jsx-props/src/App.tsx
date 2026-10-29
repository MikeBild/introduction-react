import { CartItemCard } from './CartItemCard';

export const App = () => (
  <main>
    <h1>Warenkorb</h1>
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      quantity={2}
      variant="highlighted"
      note="Mit Kalibrierschein"
    />
    {/* Der Tippfehler fällt erst auf, wenn variant ein Union Type ist. */}
    <CartItemCard
      name="Schraubendreher-Set"
      priceCents={1990}
      quantity={1}
      variant="compakt"
      note="Für die Werkbank"
    />
  </main>
);
