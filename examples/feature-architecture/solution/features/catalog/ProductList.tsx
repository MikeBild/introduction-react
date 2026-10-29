import type { ProductId } from '../../shared/ids';
import { formatCents } from '../../shared/money';
import { Card } from '../../ui/Card';
import { listProducts } from './products';

export const ProductList = ({
  onAddToCart,
}: {
  onAddToCart: (id: ProductId) => void;
}) =>
  listProducts().map((product) => (
    <Card
      key={product.id}
      header={product.name}
      actions={
        <button type="button" onClick={() => onAddToCart(product.id)}>
          {product.name} in den Warenkorb
        </button>
      }
    >
      {formatCents(product.priceCents)} · {product.stock} auf Lager
    </Card>
  ));
