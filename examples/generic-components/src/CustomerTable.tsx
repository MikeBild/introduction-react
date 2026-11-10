import { formatCents, revenueCents, type Customer } from './data';

// Exercise: this table only knows Customer. For products you would need
// a copy. Build a generic DataTable<T> in src/DataTable.tsx instead.
export const CustomerTable = ({
  customers,
}: {
  customers: readonly Customer[];
}) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>E-Mail</th>
        <th>Umsatz</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer.id}>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{formatCents(revenueCents(customer.id))}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
