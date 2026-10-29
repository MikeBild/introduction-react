import { initialCart } from './cart';
import { CheckoutForm } from './CheckoutForm';
import { placeOrder } from './placeOrder';

export const App = () => (
  <main>
    <h1>Checkout</h1>
    <CheckoutForm cart={initialCart} placeOrder={placeOrder} />
  </main>
);
