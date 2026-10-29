import { initialCart } from './cart';
import { CheckoutForm } from './CheckoutForm';

export const App = () => (
  <main>
    <h1>Checkout</h1>
    <CheckoutForm cart={initialCart} />
  </main>
);
