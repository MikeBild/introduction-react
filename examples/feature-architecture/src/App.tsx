import { CartSummary, useCart } from './features/cart';
import { ProductList } from './features/catalog';

// App layer: composes features, knows no feature internals.
export const App = () => {
  const { productIds, addToCart } = useCart();
  return (
    <main>
      <h1>Shop</h1>
      <ProductList onAddToCart={addToCart} />
      <CartSummary productIds={productIds} />
    </main>
  );
};
