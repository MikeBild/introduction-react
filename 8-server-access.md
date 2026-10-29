# Server State und Data Fetching

Daten vom Server sind ein Cache, kein lokaler State. Sie können veralten, mehrere Components brauchen sie, und nach einer Mutation müssen sie neu geladen werden. Dafür nimmst du [TanStack Query](https://tanstack.com/query), nicht `useEffect` mit drei `useState`.

```tsx
const ProductsSchema = z.array(z.object({ id: z.string(), name: z.string(), priceInCents: z.number() }));

const fetchProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return ProductsSchema.parse(await response.json());
};

const { data, isPending, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
```

## Regeln

- Prüf jede Response mit einem [zod](https://zod.dev)-Schema. Der Typ folgt über `z.infer`.
- Gib jeder Query einen sprechenden `queryKey`. Nach einer Mutation invalidierst du genau diesen Key.
- Mock die API in Tests mit [MSW](https://mswjs.io), nicht `fetch` selbst.
- Redux mit Thunks für Server-Daten findest du nur noch in Legacy-Code.

## Übung

Lektion **Server State ist ein Cache** (`react-data-fetching`): [examples/data-fetching](examples/data-fetching/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/8-server-access.md](legacy/chapters/8-server-access.md).
