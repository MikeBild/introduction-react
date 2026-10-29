# Data Fetching

Eine Produktliste, die ihre Daten per `useEffect` und `fetch` lädt – mit drei `useState`, ohne Blick auf `response.ok` und ohne Prüfung der Daten. Du ersetzt das durch `fetch`, `use()` und `Suspense` aus React 19 und einen kleinen eigenen Hook. Ohne zusätzliche Library.

Lektion: **Server State ist ein Cache** (`react-data-fetching`).

```bash
npm install
npm run dev
npm test
```

Im Dev-Modus liefert Vite die Daten als statische Datei aus `public/api/products.json`. In den Tests ersetzt `mockFetchResponses(...)` aus `src/test-utils.ts` das echte `fetch`.

## Übung

1. Schreib in `src/fetchJson.ts` eine Funktion `fetchJson<T>(url, isValid)`. Sie gibt ein Ergebnis zurück statt zu werfen: `{ ok: true, data }` oder `{ ok: false, error }` mit `error` als `'http'`, `'invalid'` oder `'network'`.
2. Prüf die Antwort mit einem selbst geschriebenen Type Guard `isProductList(value: unknown): value is Product[]`. Kein Cast, kein `as Product[]`.
3. Schreib einen Hook `useFetchJson(url, isValid)`. Er erzeugt das Promise einmal mit `useState(() => fetchJson(...))` und bietet `reload()` an, das ein neues Promise setzt – am besten in `startTransition`.
4. Ruf den Hook in `App` auf, also **außerhalb** von `Suspense`. Gib das Promise an `ProductList` weiter und lies es dort mit `use()`. Würde `ProductList` das Promise selbst erzeugen, bekäme es bei jedem Versuch ein neues und lüde endlos.
5. Zeig „Die Produkte konnten nicht geladen werden.“ bei `http` und `network`, „Die Produktdaten sind ungültig.“ bei `invalid` – jeweils mit einem Button „Erneut versuchen“.
6. Entferne `.skip` in `src/App.test.tsx`. Der erste Test muss grün bleiben.

Für mehrere Seiten, Caching über Routes hinweg und Mutations lohnt sich später eine Library wie TanStack Query. Für eine Liste reicht dieser Hook.

## Lösung

In `solution/` liegen `fetchJson.ts`, `products.ts` mit dem Type Guard, `useFetchJson.ts`, `ProductList.tsx`, `App.tsx` mit „Neu laden“-Button und die Tests. Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
