import { products } from '../../src/shop';
import { ProductList } from './ProductList';

export const App = () => (
  <main>
    <h1>Werkstatt-Shop</h1>
    <ProductList products={products} />
  </main>
);
