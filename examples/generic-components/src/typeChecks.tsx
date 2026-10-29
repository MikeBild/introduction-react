// Übung: Sobald es src/DataTable.tsx gibt, entferne das `// ` am Anfang der Zeilen
// (in VS Code: markieren, Cmd/Strg + /). `npm run typecheck` muss danach
// ohne Fehler laufen. Diese Funktion wird nie ausgeführt.
//
// import { DataTable } from './DataTable';
// import { customers, products } from './data';
//
// export const typeChecks = () => [
//   <DataTable
//     rows={products}
//     getRowKey={(product) => product.id}
//     columns={[
//       { field: 'name', header: 'Produkt' },
//       {
//         id: 'stock',
//         header: 'Lager',
//         render: (product) => (product.stock > 0 ? 'ja' : 'nein'),
//       },
//     ]}
//   />,
//   <DataTable
//     rows={customers}
//     getRowKey={(customer) => customer.id}
//     // @ts-expect-error – Customer hat kein Feld "mail"
//     columns={[{ field: 'mail', header: 'E-Mail' }]}
//   />,
// ];
export {};
