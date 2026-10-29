import { useState } from 'react';
import { placeOrder } from './api';
import { OrderList } from './OrderList';
import { ProductCount } from './ProductCount';
import { ProductList } from './ProductList';
import type { ProductId } from './shop';

// Übung react-tanstack-query: Alles ist von Hand gebaut.
// – ProductList und ProductCount laden dieselben Produkte zweimal.
// – Ein Suchtext, den du schon hattest, wird erneut geladen.
// – Nach dem Bestellen zählt App eine Version hoch, damit OrderList neu lädt.
export const App = () => {
  const [search, setSearch] = useState('');
  const [ordersVersion, setOrdersVersion] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const handleOrder = async (productId: ProductId) => {
    setIsOrdering(true);
    setOrderError(null);
    try {
      await placeOrder({
        customerId: 'c1',
        items: [{ productId, quantity: 1 }],
      });
      setOrdersVersion((version) => version + 1);
    } catch (error) {
      setOrderError(String(error));
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <main>
      <h1>Werkstatt-Shop</h1>
      <label htmlFor="search">Produktsuche</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <ProductCount search={search} />
      <ProductList
        search={search}
        isOrdering={isOrdering}
        onOrder={handleOrder}
      />
      {orderError && <p role="alert">{orderError}</p>}
      <h2>Bestellungen</h2>
      <OrderList version={ordersVersion} />
    </main>
  );
};
