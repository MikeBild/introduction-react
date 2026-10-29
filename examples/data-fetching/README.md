# Data Fetching

Eine Produktliste, die ihre Daten noch per `useEffect` und `fetch` lädt – mit eigenem Loading-Flag, eigenem Error-Flag und manuellem Nachladen nach dem POST. Du ersetzt das durch TanStack Query und prüfst die Antwort des Servers mit einem zod-Schema.

Lektion: **Server State ist ein Cache** (`react-data-fetching`).

```bash
npm install
npm run dev
npm test
```

Die API unter `/api/products` gibt es nicht wirklich. [MSW](https://mswjs.io) beantwortet die Requests: im Browser über den Service Worker aus `msw/vite`, in Vitest über `setupServer` aus `msw/node`. Beide nutzen dieselben Handler aus `src/mocks/handlers.ts`.

## Übung

1. `@tanstack/react-query` und `zod` sind schon installiert, du musst nichts nachinstallieren.
2. Leg in `src/productApi.ts` ein `ProductSchema` mit zod an und schreib `fetchProducts` und `createProduct`. Wirf bei `!response.ok` einen Error und parse jede Antwort mit dem Schema. Den Typ `Product` leitest du per `z.infer` ab.
3. Ersetze in `src/ProductList.tsx` `useEffect`, die drei `useState` und das manuelle Nachladen durch `useQuery` und `useMutation`. Nach dem Speichern rufst du `invalidateQueries` mit demselben Query Key auf.
4. Zeig „Die Produktdaten sind ungültig.“ bei einem `ZodError` und „Die Produkte konnten nicht geladen werden.“ bei einem Server Error.
5. Pack `App` in einen `QueryClientProvider` und ergänze den Provider auch in `src/test-utils.tsx` – mit `retry: false`, sonst warten die Error-Tests auf drei Retries.
6. Entferne `.skip` in `src/ProductList.test.tsx`. Die beiden ersten Tests müssen grün bleiben.

## Lösung

In `solution/` liegen `productApi.ts`, `ProductList.tsx`, `App.tsx` mit `QueryClientProvider` und die Tests, darunter ein zusätzlicher Test für einen Fehler beim Speichern.

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
