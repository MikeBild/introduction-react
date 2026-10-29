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
    {/* Der Tippfehler fällt erst auf, wenn variant ein Union Type ist. */}
    <CartItemCard
      name="Kaffeefilter"
      priceInCents={390}
      quantity={1}
      variant="compakt"
      note="Größe 4"
    />
  </main>
);
