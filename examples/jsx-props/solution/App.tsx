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
    <CartItemCard
      name="Schraubendreher-Set"
      priceCents={1990}
      variant="compact"
    />
  </main>
);
