import { useState } from 'react';
import { ProductList } from './ProductList';

export const ProductSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <section>
      <label htmlFor="search">Produktsuche</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <ProductList search={search} />
    </section>
  );
};
