# TanStack Query

Die Produktsuche und die Bestellübersicht des Werkstatt-Shops – geladen mit dem eigenen Hook `useProducts` aus der Lektion zum Datenladen. Zwei Components zeigen dieselben Produkte und laden sie doppelt. Nach dem Bestellen zählt `App` von Hand eine Version hoch, damit die Bestellübersicht neu lädt.

Zusatzkapitel: **Wann lohnt sich TanStack Query?** (`react-tanstack-query`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` startet eine Fake-API mit `/api/products?q=…` und `/api/orders` (GET und POST). Öffne den Network-Tab, bevor du tippst. Im Dev-Modus mountet `StrictMode` jede Component zweimal – zähl deshalb lieber in den Tests.

## Übung

1. Zähl im Network-Tab die Requests: beim Start, beim Tippen von „hammer“ und beim Löschen des Suchtexts. Welche sind doppelt?
2. Leg in `App` einen `QueryClientProvider` um den Inhalt und erzeug den `QueryClient` einmal mit `useState`. Setz `staleTime` bewusst, der Default ist 0.
3. Bündel Key und Ladefunktion mit `queryOptions`: `productsQuery(search)` mit dem queryKey `['products', search]` und `ordersQuery` mit `['orders']`. Gib das `signal` aus der `queryFn` an `fetchProducts` weiter.
4. Ersetze `useProducts` und `useOrders` durch `useQuery`. Die Ladefunktionen in `src/api.ts` bleiben, wie sie sind.
5. Schreib einen Hook `usePlaceOrder` mit `useMutation`, der in `onSuccess` die Query `['orders']` invalidiert. Lösch die Version und den Bestell-State aus `App`.
6. Entferne `.skip` in `src/App.test.tsx`. Für Tests bekommt jeder Test einen frischen `QueryClient` mit `retry: false`.

## Vergleich

|                    | eigener Hook `useProducts`                                     | TanStack Query                                               |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------ |
| Code               | Effect, `AbortController`, Union Type – pro Ressource ein Hook | `queryOptions` pro Ressource, Status kommt von der Library   |
| Requests           | eine Component, ein Request – auch bei gleichem Suchtext       | ein Request pro queryKey, weitere Components lesen den Cache |
| Suchtext zurück    | lädt neu                                                       | kommt aus dem Cache, solange er nicht stale ist              |
| Nach dem Bestellen | Version von Hand hochzählen                                    | `invalidateQueries({ queryKey: ['orders'] })`                |
| Kosten             | kein Paket                                                     | eine Dependency, ein Konzept, mehr Bundle                    |

Bei ein, zwei Ansichten ohne geteilte Daten bleibst du beim eigenen Hook. Sobald du Cache, Deduplizierung, Revalidierung oder Retries selbst bauen würdest, lohnt sich die Library.

## Lösung

- `solution/queries.ts` – `productsQuery`, `ordersQuery`, `usePlaceOrder`
- `solution/ProductList.tsx`, `solution/ProductCount.tsx`, `solution/OrderList.tsx`
- `solution/App.tsx` – `QueryClientProvider`, optional mit eigenem `QueryClient` für Tests
- `solution/App.test.tsx` – Requests zählen, Cache, Invalidierung, HTTP-Fehler

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
