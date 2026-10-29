import { useCart } from './cart';

const products = [
  { productId: 'p1', name: 'Kaffeebohnen' },
  { productId: 'p2', name: 'Handmühle' },
];

export const ProductList = () => {
  const { addItem } = useCart();
  return (
    <ul>
      {products.map((product) => (
        <li key={product.productId}>
          {product.name}{' '}
          <button type="button" onClick={() => addItem(product)}>
            {product.name} in den Warenkorb
          </button>
        </li>
      ))}
    </ul>
  );
};
