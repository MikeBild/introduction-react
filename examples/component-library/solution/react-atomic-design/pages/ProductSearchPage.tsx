import { useState } from 'react';
import { searchProducts } from '../../../src/data/products';
import { SearchField } from '../molecules/SearchField';
import { ProductResultList } from '../organisms/ProductResultList';
import { ProductSearchTemplate } from '../templates/ProductSearchTemplate';

// Page: fills the Template with real State and real data.
export const ProductSearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const foundProducts = searchProducts(searchText);
  return (
    <ProductSearchTemplate
      title="Produktsuche"
      searchField={
        <SearchField
          label="Produkt suchen"
          value={searchText}
          onChange={setSearchText}
        />
      }
      resultSummary={`${foundProducts.length} Treffer`}
      results={<ProductResultList products={foundProducts} />}
    />
  );
};
