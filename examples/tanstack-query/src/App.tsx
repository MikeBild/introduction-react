import { useState } from 'react';
import { placeOrder } from './api';
import { errorText } from './errorText';
import { OrderList } from './OrderList';
import { ProductCount } from './ProductCount';
import { ProductList } from './ProductList';
import type { ProductId } from './shop';

// Exercise react-tanstack-query: everything is built by hand.
// – ProductList and ProductCount load the same products twice.
// – A search text you already had is loaded again.
// – After ordering, App increments a version so that OrderList reloads.
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
      setOrderError(errorText(error));
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
