import { Suspense } from 'react';
import { ProductList } from './ProductList';
import { isProductList } from './products';
import { useFetchJson } from './useFetchJson';

export const App = () => {
  const { promise, reload, isReloading } = useFetchJson(
    '/api/products.json',
    isProductList
  );
  return (
    <main>
      <h1>Produkte</h1>
      <button type="button" onClick={reload} disabled={isReloading}>
        Neu laden
      </button>
      <Suspense fallback={<p>Lädt …</p>}>
        <ProductList productsPromise={promise} onRetry={reload} />
      </Suspense>
    </main>
  );
};
