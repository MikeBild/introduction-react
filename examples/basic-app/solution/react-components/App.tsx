import { products } from '../../src/products';
import { ProductList } from './ProductList';

export const App = () => (
  <main>
    <h1>Produkte</h1>
    <ProductList products={products} />
  </main>
);
