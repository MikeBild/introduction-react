import { CustomerTable } from './CustomerTable';
import { customers } from './data';

export const App = () => (
  <main>
    <h1>Kunden</h1>
    <CustomerTable customers={customers} />
  </main>
);
