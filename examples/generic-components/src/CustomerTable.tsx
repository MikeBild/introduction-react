import { formatPrice, type Customer } from './data';

// Übung: Diese Tabelle kennt nur Customer. Für Produkte bräuchtest du
// eine Kopie. Bau stattdessen eine generische DataTable<T> in src/DataTable.tsx.
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
          <td>{formatPrice(customer.revenueInCents)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
