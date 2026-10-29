# Server-Daten laden

Daten vom Server kommen asynchron, können fehlschlagen und haben eine Form, die TypeScript nicht kennt. Für das Laden brauchst du keine Library: `fetch`, `use` und `Suspense` aus React 19 reichen für die meisten Seiten.

## Vorher: Effect mit drei States

```tsx
const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
  fetch('/api/products.json')
    .then((response) => response.json())
    .then(setProducts)
    .catch((error) => setError(String(error)))
    .finally(() => setIsLoading(false));
}, []);
```

Kein Abbruch, keine Prüfung von `response.ok`, keine Prüfung der Daten – und jede Component wiederholt dieses Muster.

## Nachher: Promise, use und Suspense

```tsx
// Ein kleiner eigener Hook erzeugt das Promise einmal, außerhalb von Suspense.
const { promise, reload } = useFetchJson('/api/products.json', isProductList);

<Suspense fallback={<p>Produkte werden geladen …</p>}>
  <ProductList productsPromise={promise} onRetry={reload} />
</Suspense>;

// In der Liste liest use() das Ergebnis. Bis es da ist, zeigt Suspense den Fallback.
const result = use(productsPromise);
if (!result.ok) return <LoadError onRetry={onRetry} />;
```

## Regeln

- Erzeuge das Promise nie beim Rendern der Component, die `use()` aufruft. Sonst lädt sie endlos.
- Prüf `response.ok` und die Form der Daten mit einem Type Guard, statt blind zu casten.
- Gib Fehler als Ergebnis zurück (`{ ok: false, … }`) oder fang sie mit einer Error Boundary. `use()` gehört nie in `try/catch`.
- Lade neu in einer Transition (`startTransition`). Dann bleibt die alte Liste sichtbar, bis die neue da ist.
- Mock `fetch` in Tests mit `vi.spyOn(globalThis, 'fetch')`.

Brauchst du Caching über Seiten hinweg, Hintergrund-Refresh oder Mutationen mit Invalidierung, lohnt sich eine Library wie TanStack Query. Für den Einstieg brauchst du sie nicht.

## Übung

Lektion **Server State ist ein Cache** (`react-data-fetching`): [examples/data-fetching](examples/data-fetching/README.md)

Die alte Fassung dieses Kapitels (Redux Thunks) liegt unter [legacy/chapters/8-server-access.md](legacy/chapters/8-server-access.md).
