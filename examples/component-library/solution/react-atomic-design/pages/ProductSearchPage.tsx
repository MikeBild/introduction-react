import { useState } from 'react';
import { searchProducts } from '../../../src/data/products';
import { SearchField } from '../molecules/SearchField';
import { ProductResultList } from '../organisms/ProductResultList';
import { ProductSearchTemplate } from '../templates/ProductSearchTemplate';

// Page: füllt das Template mit echtem State und echten Daten.
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
