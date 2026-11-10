*English · [Deutsch](8-server-access.de.md)*

# Loading server data

Data from the server arrives asynchronously, can fail, and does not always arrive in the order you requested it. To get started you need no library: `fetch`, an `AbortController`, and your own hook are enough.

## Before: old answers overtake new ones

```tsx
const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  fetch(`/api/products?q=${search}`)
    .then((response) => response.json())
    .then(setProducts);
}, [search]);
```

If you quickly type “boh” and then “bohrer”, the slower answer for “boh” can arrive last and overwrite the correct list. On top of that, the check of `response.ok` and an error state are missing.

## After: a hook with AbortController

```tsx
export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

export const useProducts = (search: string): LoadState<Product[]> => {
  const [state, setState] = useState<LoadState<Product[]>>({ status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    fetchProducts(search, controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setState({ status: 'error', message: String(error) });
      });
    // The cleanup aborts the request for the old search text.
    return () => controller.abort();
  }, [search]);
  return state;
};
```

## Rules

- Give every request that an effect starts an `AbortController` and abort it in the cleanup.
- Describe the state as a union type. Then there is no “loading and has an error” at the same time.
- Check `response.ok` and the shape of the data with a type guard instead of casting blindly.
- Mock `fetch` in tests with `vi.stubGlobal('fetch', …)` or `vi.spyOn(globalThis, 'fetch')`.

How to read the same data with `use` and `Suspense` is shown in [18-more-pattern.md](18-more-pattern.md).

Exercise: lesson **Old answers must not overtake new ones** (`react-data-fetching`) – [examples/data-fetching](examples/data-fetching/README.md)

## Extra chapter: TanStack Query

If you need caching across components and pages, deduplication of identical requests, background refresh, or mutations with invalidation, your own hook quickly grows large. Then [TanStack Query](https://tanstack.com/query) is worth it:

```tsx
const productsQuery = (search: string) =>
  queryOptions({ queryKey: ['products', search], queryFn: ({ signal }) => fetchProducts(search, signal) });

const { data, isPending, error } = useQuery(productsQuery(search));
```

Exercise: lesson **When is TanStack Query worth it?** (`react-tanstack-query`) – [examples/tanstack-query](examples/tanstack-query/README.md)

The earlier version of this chapter (Redux thunks) is in [archive/chapters/8-server-access.md](archive/chapters/8-server-access.md).
