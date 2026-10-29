import type { Product } from './products';
import { formatCents } from './shop';

export const ProductTable = ({
  products,
}: {
  products: readonly Product[];
}) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Preis</th>
        <th>Bestand</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{formatCents(product.priceCents)}</td>
          <td>{product.stock}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
