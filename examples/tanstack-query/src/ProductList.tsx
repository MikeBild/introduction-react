import { formatCents, type ProductId } from './shop';
import { useProducts } from './useProducts';

type ProductListProps = {
  search: string;
  isOrdering: boolean;
  onOrder: (productId: ProductId) => void;
};

export const ProductList = ({
  search,
  isOrdering,
  onOrder,
}: ProductListProps) => {
  const products = useProducts(search);
  if (products.status === 'loading') return <p>Lade Produkte …</p>;
  if (products.status === 'error')
    return <p role="alert">{products.message}</p>;
  return (
    <ul aria-label="Produkte">
      {products.data.map((product) => (
        <li key={product.id}>
          {product.name} – {formatCents(product.priceCents)}{' '}
          <button
            type="button"
            disabled={isOrdering || product.stock === 0}
            onClick={() => onOrder(product.id)}
          >
            {product.name} bestellen
          </button>
        </li>
      ))}
    </ul>
  );
};
