import { customers } from '../src/data/customers';
import { ProductSearchPage } from './react-atomic-design/pages/ProductSearchPage';
import { CustomerOverview } from './react-composition/CustomerOverview';

export const App = () => (
  <main>
    <h1>Component Library</h1>
    <CustomerOverview
      customers={customers}
      onEdit={(customer) => alert(`${customer.name} bearbeiten`)}
    />
    <ProductSearchPage />
  </main>
);
