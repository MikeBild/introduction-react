import { products } from './products';

// Übung react-components: Diese eine Component macht alles.
// Zerlege sie in drei Function Components mit typisierten Props.
export const App = () => (
  <main>
    <h1>Produkte</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <span>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }).format(product.priceInCents / 100)}
          </span>
          {!product.isInStock && <strong> ausverkauft</strong>}
        </li>
      ))}
    </ul>
  </main>
);
