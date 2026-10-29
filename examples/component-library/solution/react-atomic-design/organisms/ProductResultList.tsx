import type { Product } from '../../../src/data/products';
import { ProductTile } from '../molecules/ProductTile';

// Organism: ein eigenständiger Bereich der Seite, zusammengesetzt aus Molecules.
export const ProductResultList = ({
  products,
}: {
  products: readonly Product[];
}) =>
  products.length > 0 ? (
    <ul>
      {products.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </ul>
  ) : (
    <p>Keine Produkte gefunden</p>
  );
