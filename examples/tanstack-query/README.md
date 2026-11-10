*English · [Deutsch](README.de.md)*

# TanStack Query

The product search and the order overview of the workshop shop – loaded with the custom hook `useProducts` from the data-fetching lesson. Two components show the same products and load them twice. After placing an order, `App` manually increments a version so that the order overview reloads.

Extra chapter: **When is TanStack Query worth it?** (`react-tanstack-query`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` starts a fake API with `/api/products?q=…` and `/api/orders` (GET and POST). Open the Network tab before you type. In dev mode, `StrictMode` mounts every component twice – so count in the tests instead.

## Exercise

1. Count the requests in the Network tab: at startup, while typing “hammer”, and when clearing the search text. Which ones are duplicates?
2. Wrap the content of `App` in a `QueryClientProvider` and create the `QueryClient` once with `useState`. Set `staleTime` deliberately; the default is 0.
3. Bundle key and loading function with `queryOptions`: `productsQuery(search)` with the queryKey `['products', search]` and `ordersQuery` with `['orders']`. Pass the `signal` from the `queryFn` on to `fetchProducts`.
4. Replace `useProducts` and `useOrders` with `useQuery`. The loading functions in `src/api.ts` stay as they are. Show errors with `errorText(query.error)` from `src/errorText.ts` – a readable sentence with a next step instead of `String(error)`.
5. Write a hook `usePlaceOrder` with `useMutation` that invalidates the query `['orders']` in `onSuccess`. Delete the version and the order state from `App`.
6. Remove `.skip` in `src/App.test.tsx`. For tests, every test gets a fresh `QueryClient` with `retry: false`.

## Comparison

|                  | custom hook `useProducts`                                     | TanStack Query                                              |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Code             | effect, `AbortController`, union type – one hook per resource | `queryOptions` per resource, status comes from the library  |
| Requests         | one component, one request – even for the same search text    | one request per queryKey, further components read the cache |
| Search text back | reloads                                                       | comes from the cache as long as it is not stale             |
| After ordering   | increment the version by hand                                 | `invalidateQueries({ queryKey: ['orders'] })`               |
| Cost             | no package                                                    | one dependency, one concept, more bundle                    |

With one or two views without shared data, you stay with the custom hook. As soon as you would build cache, deduplication, revalidation, or retries yourself, the library is worth it.

## Reference solution

- `solution/queries.ts` – `productsQuery`, `ordersQuery`, `usePlaceOrder`
- `solution/ProductList.tsx`, `solution/ProductCount.tsx`, `solution/OrderList.tsx`
- `solution/App.tsx` – `QueryClientProvider`, optionally with its own `QueryClient` for tests
- `solution/App.test.tsx` – count requests, cache, invalidation, HTTP error

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
