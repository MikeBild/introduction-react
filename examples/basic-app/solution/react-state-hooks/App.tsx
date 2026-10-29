import { useState } from 'react';
import {
  formatCents,
  orderTotalCents,
  products,
  type OrderItem,
  type Product,
  type ProductId,
} from '../../src/shop';
import { ProductList } from '../react-components/ProductList';

export const App = () => {
  // State: nur Suchtext und Warenkorb-Positionen.
  const [searchText, setSearchText] = useState('');
  const [cart, setCart] = useState<readonly OrderItem[]>([]);

  // Abgeleitet beim Rendern: gefilterte Liste und Summe.
  const normalizedSearchText = searchText.trim().toLowerCase();
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchText)
  );
  const totalCents = orderTotalCents(cart);

  const addToCart = (product: Product) =>
    setCart((current) =>
      current.some((item) => item.productId === product.id)
        ? current.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...current,
            {
              productId: product.id,
              quantity: 1,
              priceCents: product.priceCents,
            },
          ]
    );
  const removeFromCart = (productId: ProductId) =>
    setCart((current) =>
      current.filter((item) => item.productId !== productId)
    );
  const productName = (productId: ProductId) =>
    products.find((product) => product.id === productId)?.name ?? productId;

  return (
    <main>
      <h1>Werkstatt-Shop</h1>
      <label htmlFor="search">Suche</label>
      <input
        id="search"
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {visibleProducts.length > 0 ? (
        <ProductList
          products={visibleProducts}
          renderAction={(product) => (
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              {product.name} in den Warenkorb
            </button>
          )}
        />
      ) : (
        <p>Keine Produkte für „{searchText}“</p>
      )}
      <section aria-label="Warenkorb">
        <p>
          <strong>Warenkorb</strong>
        </p>
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              {productName(item.productId)} × {item.quantity}{' '}
              <button
                type="button"
                onClick={() => removeFromCart(item.productId)}
              >
                {productName(item.productId)} entfernen
              </button>
            </li>
          ))}
        </ul>
        <p>Summe: {formatCents(totalCents)}</p>
      </section>
    </main>
  );
};
