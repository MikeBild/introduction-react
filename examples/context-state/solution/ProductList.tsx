import { useCart } from './cart';
import { products } from '../src/shop';

export const ProductList = () => {
  const { addItem } = useCart();
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}{' '}
          <button type="button" onClick={() => addItem(product)}>
            {product.name} in den Warenkorb
          </button>
        </li>
      ))}
    </ul>
  );
};
