import { Cart } from './Cart';
import { addItemToDraft } from './cartApi';

export const App = () => (
  <main>
    <h1>Warenkorb</h1>
    <Cart addItemToDraft={addItemToDraft} />
  </main>
);
