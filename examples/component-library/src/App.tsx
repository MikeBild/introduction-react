import { useState } from 'react';
import { CustomerCard } from './components/CustomerCard';
import { ProductTile } from './components/ProductTile';
import { SearchField } from './components/SearchField';
import { countOrders, customers } from './data/customers';
import { searchProducts } from './data/products';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <main>
      <h1>Werkstatt-Shop · Component Library</h1>

      <h2>Kundenübersicht</h2>
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          title={customer.name}
          subtitle={customer.email}
          showBadge={countOrders(customer.id) > 0}
          badgeText={`${countOrders(customer.id)} Bestellungen`}
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
