# Data Fetching

Die Produktsuche des Werkstatt-Shops lädt bei jeder Eingabe neu. Der Fetch-Code steckt direkt in der Component – und hat einen Fehler, den du erst siehst, wenn das Netz langsam ist: Eine alte Antwort kann eine neue überholen.

Lektion: **Alte Antworten dürfen neue nicht überholen** (`react-data-fetching`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` startet eine kleine Fake-API unter `/api/products?q=…`. Kurze Suchtexte antworten absichtlich langsamer.

## Übung

1. Tipp im Browser zügig „boh“ und dann „bohrer“. Nach gut einer Sekunde springt die Liste zurück auf die Treffer für „boh“. Die langsame Antwort hat die schnelle überholt.
2. Schreib in `src/fetchProducts.ts` eine Funktion `fetchProducts(search, signal)`. Sie wirft bei HTTP-Fehlern selbst, behandelt die Antwort als `unknown` und prüft sie mit einem Type Guard, bevor sie ein `Product[]` zurückgibt.
3. Schreib einen Hook `useProducts(search)` in `src/useProducts.ts`. Modellier den Status als Union Type `LoadState<T>` mit `loading`, `error` und `success`. Brich im Cleanup des Effects den Request per `AbortController` ab.
4. Nutz den Hook in einer `ProductList` und lösch den alten Fetch-Code aus `ProductSearch`.
5. Entferne `.skip` in `src/ProductSearch.test.tsx`. Die Tests beantworten Requests in falscher Reihenfolge und mit Status 500.

`use` und `Suspense` kommen erst in der Lektion **Wo wird gewartet, wo werden Errors gefangen?** (`examples/suspense-errors`). Cache, Deduplizierung und Retries zeigt das Zusatzkapitel TanStack Query (`examples/tanstack-query`).

## Lösung

- `solution/fetchProducts.ts` – Laden, Status prüfen, Antwort prüfen
- `solution/useProducts.ts` – Effect mit `AbortController`, Ergebnis mit seinem Suchtext
- `solution/ProductList.tsx` und `solution/ProductSearch.tsx`
- `solution/ProductSearch.test.tsx` – Race Condition, Abbruch, HTTP-Fehler, ungültige Antwort

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
