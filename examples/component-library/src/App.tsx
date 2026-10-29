import { useState } from 'react';
import { CustomerCard } from './components/CustomerCard';
import { ProductTile } from './components/ProductTile';
import { SearchField } from './components/SearchField';
import { customers } from './data/customers';
import { searchProducts } from './data/products';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <main>
      <h1>Component Library</h1>

      <h2>Kundenübersicht</h2>
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          title={customer.name}
          subtitle={customer.company}
          showAvatar
          avatarUrl={customer.avatarUrl}
          showBadge={customer.isPremium}
          badgeText="Premium"
          showActions
          onEdit={() => alert(`${customer.name} bearbeiten`)}
        />
      ))}

      <h2>Produktsuche</h2>
      <SearchField
        label="Produkt suchen"
        value={searchText}
        onChange={setSearchText}
      />
      <ul>
        {searchProducts(searchText).map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </ul>
    </main>
  );
};
