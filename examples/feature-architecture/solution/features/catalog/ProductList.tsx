import { formatPrice } from '../../shared/formatPrice';
import { Card } from '../../ui/Card';
import { listProducts } from './products';

export const ProductList = ({
  onAddToCart,
}: {
  onAddToCart: (productId: string) => void;
}) =>
  listProducts().map((product) => (
    <Card
      key={product.id}
      header={product.name}
      actions={
        <button type="button" onClick={() => onAddToCart(product.id)}>
          Add {product.name} to cart
        </button>
      }
    >
      {formatPrice(product.priceInCents)}
    </Card>
  ));
