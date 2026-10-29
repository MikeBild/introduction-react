import { formatCents, products } from '../src/shop';

export const ProductsPage = () => (
  <section>
    <h1>Produkte</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} – {formatCents(product.priceCents)}
        </li>
      ))}
    </ul>
  </section>
);
