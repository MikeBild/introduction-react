# Server-Daten laden

Daten vom Server kommen asynchron, können fehlschlagen und kommen nicht immer in der Reihenfolge an, in der du sie angefragt hast. Für den Einstieg brauchst du keine Library: `fetch`, ein `AbortController` und ein eigener Hook reichen.

## Vorher: alte Antworten überholen neue

```tsx
const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  fetch(`/api/products?q=${search}`)
    .then((response) => response.json())
    .then(setProducts);
}, [search]);
```

Tippst du schnell „boh“ und dann „bohrer“, kann die langsamere Antwort für „boh“ zuletzt ankommen und die richtige Liste überschreiben. Dazu fehlen die Prüfung von `response.ok` und ein Error State.

## Nachher: ein Hook mit AbortController

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
    // Der Cleanup bricht den Request für den alten Suchtext ab.
    return () => controller.abort();
  }, [search]);
  return state;
};
```

## Regeln

- Gib jedem Request, den ein Effect startet, einen `AbortController` und brich ihn im Cleanup ab.
- Beschreib den Zustand als Union Type. Dann gibt es kein „lädt und hat einen Fehler“ gleichzeitig.
- Prüf `response.ok` und die Form der Daten mit einem Type Guard, statt blind zu casten.
- Mock `fetch` in Tests mit `vi.stubGlobal('fetch', …)` oder `vi.spyOn(globalThis, 'fetch')`.

Wie du dieselben Daten mit `use` und `Suspense` liest, zeigt [18-more-pattern.md](18-more-pattern.md).

Übung: Lektion **Alte Antworten dürfen neue nicht überholen** (`react-data-fetching`) – [examples/data-fetching](examples/data-fetching/README.md)

## Zusatzkapitel: TanStack Query

Brauchst du Caching über Components und Seiten hinweg, Deduplizierung gleicher Requests, Hintergrund-Refresh oder Mutationen mit Invalidierung, wird der eigene Hook schnell groß. Dann lohnt sich [TanStack Query](https://tanstack.com/query):

```tsx
const productsQuery = (search: string) =>
  queryOptions({ queryKey: ['products', search], queryFn: ({ signal }) => fetchProducts(search, signal) });

const { data, isPending, error } = useQuery(productsQuery(search));
```

Übung: Lektion **Wann lohnt sich TanStack Query?** (`react-tanstack-query`) – [examples/tanstack-query](examples/tanstack-query/README.md)

Die alte Fassung dieses Kapitels (Redux Thunks) liegt unter [legacy/chapters/8-server-access.md](legacy/chapters/8-server-access.md).
