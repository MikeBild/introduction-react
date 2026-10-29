import { useState } from 'react';
import { searchProducts } from '../src/products';
import { useDebouncedValue } from './useDebouncedValue';

export const ProductSearch = ({ delayMs = 300 }: { delayMs?: number }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, delayMs);
  const results = searchProducts(debouncedQuery);

  return (
    <section>
      <label htmlFor="product-search">Produkt suchen</label>
      <input
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul aria-label="Treffer">
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
};
