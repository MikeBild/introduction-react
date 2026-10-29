import { useQuery } from '@tanstack/react-query';
import { formatCents } from '../src/shop';
import { productsQuery, usePlaceOrder } from './queries';

export const ProductList = ({ search }: { search: string }) => {
  const products = useQuery(productsQuery(search));
  const placeOrderMutation = usePlaceOrder();
  if (products.isPending) return <p>Lade Produkte …</p>;
  if (products.isError) return <p role="alert">{String(products.error)}</p>;
  return (
    <>
      <ul aria-label="Produkte">
        {products.data.map((product) => (
          <li key={product.id}>
            {product.name} – {formatCents(product.priceCents)}{' '}
            <button
              type="button"
              disabled={placeOrderMutation.isPending || product.stock === 0}
              onClick={() =>
                placeOrderMutation.mutate({
                  customerId: 'c1',
                  items: [{ productId: product.id, quantity: 1 }],
                })
              }
            >
              {product.name} bestellen
            </button>
          </li>
        ))}
      </ul>
      {placeOrderMutation.isError && (
        <p role="alert">{String(placeOrderMutation.error)}</p>
      )}
    </>
  );
};
