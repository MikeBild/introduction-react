import { Checkout } from './Checkout';
import { OrderStatusPanel } from './OrderStatusPanel';
import { orderId } from './shop';

const placeOrderAfterDelay = () =>
  new Promise<ReturnType<typeof orderId>>((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() > 0.3
          ? resolve(orderId(`o${Math.floor(Math.random() * 9000) + 1000}`))
          : reject(new Error('Zahlung abgelehnt')),
      800
    )
  );

export const App = () => (
  <main>
    <h1>Werkstatt-Shop</h1>
    <h2>Checkout</h2>
    <Checkout placeOrder={placeOrderAfterDelay} />
    <OrderStatusPanel />
  </main>
);
