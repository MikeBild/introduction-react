import type { Product } from './products';

const euroFormat = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export const ProductTable = ({
  products,
}: {
  products: readonly Product[];
}) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Kategorie</th>
        <th>Preis</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{euroFormat.format(product.priceInCents / 100)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
