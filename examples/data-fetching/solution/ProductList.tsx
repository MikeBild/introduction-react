import { use } from 'react';
import type { FetchError, FetchResult } from './fetchJson';
import type { Product } from './products';

const errorMessages: Record<FetchError, string> = {
  http: 'Die Produkte konnten nicht geladen werden.',
  network: 'Die Produkte konnten nicht geladen werden.',
  invalid: 'Die Produktdaten sind ungültig.',
};

type ProductListProps = {
  productsPromise: Promise<FetchResult<Product[]>>;
  onRetry: () => void;
};

export const ProductList = ({ productsPromise, onRetry }: ProductListProps) => {
  // use() wartet auf das Promise. Bis dahin zeigt Suspense den Fallback.
  const result = use(productsPromise);

  if (!result.ok)
    return (
      <div role="alert">
        <p>{errorMessages[result.error]}</p>
        <button type="button" onClick={onRetry}>
          Erneut versuchen
        </button>
      </div>
    );

  if (result.data.length === 0) return <p>Noch keine Produkte.</p>;

  return (
    <ul>
      {result.data.map((product) => (
        <li key={product.id}>
          {product.name} – {(product.priceInCents / 100).toFixed(2)} €
        </li>
      ))}
    </ul>
  );
};
