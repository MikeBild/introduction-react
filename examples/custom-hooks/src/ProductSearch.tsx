import { useEffect, useState } from 'react';
import { searchProducts } from './products';

// Exercise react-custom-hooks: the debounce logic sits in the middle of the component.
// Extract it into a generic useDebouncedValue<T>.
export const ProductSearch = ({ delayMs = 300 }: { delayMs?: number }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedQuery(query), delayMs);
    return () => clearTimeout(timeoutId);
  }, [query, delayMs]);

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
