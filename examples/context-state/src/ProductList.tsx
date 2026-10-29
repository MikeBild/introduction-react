import { useContext } from 'react';
import { CartContext } from './cart';
import { products } from './shop';

export const ProductList = () => {
  const { addItem } = useContext(CartContext);
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
