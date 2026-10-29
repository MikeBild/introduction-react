import { CartSummary, useCart } from './features/cart';
import { ProductList } from './features/catalog';

// App-Schicht: setzt Features zusammen, kennt keine Interna.
export const App = () => {
  const { productIds, addToCart } = useCart();
  return (
    <main>
      <h1>Werkstatt-Shop</h1>
      <ProductList onAddToCart={addToCart} />
      <CartSummary productIds={productIds} />
    </main>
  );
};
