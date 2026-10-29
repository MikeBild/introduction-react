import { useState } from 'react';
import { formatCents, type Product } from '../src/shop';
import { createProductSearch } from './createProductSearch';
import { useObservable } from './useObservable';

const noProducts: Product[] = [];

export const ProductSearch = () => {
  // Jede Component bekommt ihre eigene Suche.
  const [productSearch] = useState(createProductSearch);
  const products = useObservable(productSearch.results$, noProducts);
  return (
    <>
      <input
        aria-label="Produktsuche"
        onChange={(event) => productSearch.search(event.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – {formatCents(product.priceCents)}
          </li>
        ))}
      </ul>
    </>
  );
};
