import { CartBadge } from './CartBadge';
import { CartProvider } from './cart';
import { ProductList } from './ProductList';

export const App = () => (
  <CartProvider>
    <main>
      <h1>Shop</h1>
      <CartBadge />
      <ProductList />
    </main>
  </CartProvider>
);
