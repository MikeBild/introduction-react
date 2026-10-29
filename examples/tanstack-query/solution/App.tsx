import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { OrderList } from './OrderList';
import { ProductCount } from './ProductCount';
import { ProductList } from './ProductList';

// staleTime bewusst setzen: Der Default 0 lädt bei jedem Mount neu.
const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } });

export const App = ({ queryClient }: { queryClient?: QueryClient }) => {
  const [client] = useState(() => queryClient ?? createQueryClient());
  const [search, setSearch] = useState('');
  return (
    <QueryClientProvider client={client}>
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
        <ProductList search={search} />
        <h2>Bestellungen</h2>
        <OrderList />
      </main>
    </QueryClientProvider>
  );
};
