import { formatCents } from '../src/shop';
import { useProducts } from './useProducts';

export const ProductList = ({ search }: { search: string }) => {
  const products = useProducts(search);
  if (products.status === 'loading') return <p>Lade Produkte …</p>;
  if (products.status === 'error')
    return <p role="alert">{products.message}</p>;
  if (products.data.length === 0) return <p>Keine Treffer für „{search}“</p>;
  return (
    <ul>
      {products.data.map((product) => (
        <li key={product.id}>
          {product.name} – {formatCents(product.priceCents)}
        </li>
      ))}
    </ul>
  );
};
