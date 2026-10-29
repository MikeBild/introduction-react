import { useEffect, useState } from 'react';
import { searchProducts } from './products';

// Übung react-custom-hooks: Die Debounce-Logik steckt mitten in der Component.
// Extrahiere sie in einen generischen useDebouncedValue<T>.
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
