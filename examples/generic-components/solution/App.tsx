import { customers, formatPrice, type Customer } from '../src/data';
import { DataTable, type Column } from './DataTable';

const customerColumns: readonly Column<Customer>[] = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'E-Mail' },
  {
    id: 'revenue',
    header: 'Umsatz',
    render: (customer) => formatPrice(customer.revenueInCents),
  },
];

export const App = () => (
  <main>
    <h1>Kunden</h1>
    <DataTable
      rows={customers}
      columns={customerColumns}
      getRowKey={(customer) => customer.id}
    />
  </main>
);
