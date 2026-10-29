import { products } from './shop';

// Übung react-components: Diese eine Component macht alles.
// Zerlege sie in drei Function Components mit typisierten Props.
export const App = () => (
  <main>
    <h1>Werkstatt-Shop</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <span>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }).format(product.priceCents / 100)}
          </span>
          {product.stock === 0 && <strong> Ausverkauft</strong>}
        </li>
      ))}
    </ul>
  </main>
);
