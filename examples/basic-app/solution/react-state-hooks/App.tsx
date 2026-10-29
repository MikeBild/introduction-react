import { useState } from 'react';
import { products } from '../../src/products';
import { ProductList } from '../react-components/ProductList';

export const App = () => {
  // Nur der Suchtext ist State – die gefilterte Liste wird abgeleitet.
  const [searchText, setSearchText] = useState('');
  const normalizedSearchText = searchText.trim().toLowerCase();
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchText)
  );

  return (
    <main>
      <h1>Produkte</h1>
      <label htmlFor="search">Suche</label>
      <input
        id="search"
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {visibleProducts.length > 0 ? (
        <ProductList products={visibleProducts} />
      ) : (
        <p>Keine Produkte für „{searchText}“</p>
      )}
    </main>
  );
};
