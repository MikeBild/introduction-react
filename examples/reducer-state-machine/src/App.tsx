import { Checkout } from './Checkout';

const placeOrderAfterDelay = () =>
  new Promise<string>((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() > 0.3
          ? resolve(crypto.randomUUID().slice(0, 8))
          : reject(new Error('Payment declined')),
      800
    )
  );

export const App = () => (
  <main>
    <h1>Checkout</h1>
    <Checkout placeOrder={placeOrderAfterDelay} />
  </main>
);
