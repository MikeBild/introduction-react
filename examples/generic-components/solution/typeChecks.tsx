import { customers, products } from '../src/data';
import { DataTable } from './DataTable';

// Wird nie ausgeführt – `tsc --noEmit` prüft nur, dass die Typen passen.
export const typeChecks = () => [
  <DataTable
    rows={products}
    getRowKey={(product) => product.sku}
    columns={[
      { field: 'title', header: 'Produkt' },
      {
        id: 'stock',
        header: 'Lager',
        render: (product) => (product.isInStock ? 'ja' : 'nein'),
      },
    ]}
  />,
  <DataTable
    rows={customers}
    getRowKey={(customer) => customer.id}
    // @ts-expect-error – Customer hat kein Feld "mail"
    columns={[{ field: 'mail', header: 'E-Mail' }]}
  />,
];
