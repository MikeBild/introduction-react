// Exercise: once src/DataTable.tsx exists, remove the `// ` at the start of the lines
// (in VS Code: select them, Cmd/Ctrl + /). `npm run typecheck` must then
// run without errors. This function is never executed.
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
//     // @ts-expect-error – Customer has no field "mail"
//     columns={[{ field: 'mail', header: 'E-Mail' }]}
//   />,
// ];
export {};
