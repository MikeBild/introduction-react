import { CartItemCard } from './CartItemCard';

export const App = () => (
  <main>
    <h1>Warenkorb</h1>
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      quantity={2}
      variant="highlighted"
      note="Frisch geröstet"
    />
    <CartItemCard name="Kaffeefilter" priceInCents={390} variant="compact" />
  </main>
);
