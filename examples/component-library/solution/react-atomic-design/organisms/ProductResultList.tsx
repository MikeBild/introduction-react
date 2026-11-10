import type { Product } from '../../../src/data/products';
import { ProductTile } from '../molecules/ProductTile';

// Organism: a self-contained section of the page, composed of Molecules.
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
    <p>
      Keine Produkte gefunden. Prüf die Schreibweise oder such nach einem
      kürzeren Begriff.
    </p>
  );
