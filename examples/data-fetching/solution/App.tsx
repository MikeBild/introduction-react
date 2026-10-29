import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductList } from './ProductList';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <main>
      <h1>Produkte</h1>
      <ProductList />
    </main>
  </QueryClientProvider>
);
