# Vite Setup

Die Produktliste des Werkstatt-Shops in einem frischen Vite-Projekt. Die Produkte kommen von einer kleinen Fake-API auf Port 3000, der Dev Server läuft auf Port 5173 – und genau dazwischen klemmt es noch.

Zusatzkapitel: **Vite startet dein Projekt in Sekunden** (`react-vite-setup`)

```bash
npm install
npm run api   # Terminal 1: Fake-API auf http://localhost:3000/api/products
npm run dev   # Terminal 2: Dev Server auf http://localhost:5173
npm test
npm run build # tsc -b && vite build
npm run preview
```

## So ist das Projekt entstanden

```bash
npm create vite@latest vite-setup -- --template react-ts
```

Aus dem Template sind die Demo-Assets und das CSS geflogen. Dazu kamen der React Compiler, Vitest mit Testing Library, `src/shop.ts` und die Fake-API `api-server.ts`. Alles andere ist so, wie `npm create vite` es anlegt:

- `index.html` im Projekt-Root ist der Einstiegspunkt und lädt `src/main.tsx` als Modul.
- `tsconfig.json` verweist auf `tsconfig.app.json` (Code im Browser) und `tsconfig.node.json` (Config und Server in Node).
- `npm run build` ruft erst `tsc -b` und dann `vite build` auf.

Wenn du magst, leg das Template einmal selbst in einem leeren Ordner an und vergleich die Dateien. Vite 8 braucht Node.js 20.19 oder 22.12 und neuer, die Beispiele hier laufen mit Node.js 26.

## Übung

1. Starte `npm run api` und `npm run dev` und öffne die App. Statt der Produkte siehst du eine Fehlermeldung (den Text liefert `errorText` aus `src/errorText.ts`), in der Konsole der DevTools einen CORS-Fehler (Cross-Origin Resource Sharing). `src/features/products/fetchProducts.ts` ruft `http://localhost:3000` direkt auf, also einen zweiten Origin, und die Fake-API erlaubt das nicht.
2. Ändere die URL in `fetchProducts.ts` auf den relativen Pfad `/api/products`. Jetzt antwortet der Dev Server selbst – mit der `index.html`, die Meldung lautet deshalb „Der Server hat kein gültiges JSON geschickt“. Trag in `vite.config.ts` einen Proxy ein: `server: { proxy: { '/api': 'http://localhost:3000' } }`. Nach dem Neustart siehst du die Produkte, und im Terminal der Fake-API kommen die Requests an. CORS musst du dafür nicht öffnen. Entferne `.skip` in `src/features/products/ProductList.test.tsx` und beim Proxy-Test in `vite.config.test.ts`.
3. Ersetze in `ProductList.tsx` und `fetchProducts.ts` die Importe `../../shop` und `../../errorText` durch `@/shop` und `@/errorText`. `npm run typecheck` bleibt grün, denn `tsconfig.app.json` kennt den Alias unter `paths`. Der Dev Server meldet aber „Failed to resolve import“: Vite liest `paths` nicht von selbst. Ergänze `resolve: { tsconfigPaths: true }` in `vite.config.ts`, dann pflegst du Aliase nur in der tsconfig. Entferne `.skip` beim Alias-Test in `vite.config.test.ts`. Vitest nutzt dieselbe Konfiguration, die Tests finden den Alias also auch.
4. Vergleich Dev Server und Build. Im Tab Network der DevTools lädt der Browser im Development jedes Modul einzeln, zum Beispiel `/src/features/products/ProductList.tsx`. Führ `npm run build` aus und schau in `dist/assets`: Dort liegt ein einziges gebündeltes Script mit Hash im Namen.
5. Vite übersetzt, `tsc` prüft. Setz in `src/shop.ts` beim ersten Produkt `priceCents: '89,90'`. `npx vite build` baut trotzdem, denn Vite entfernt die Typen nur. `npm run build` bricht schon bei `tsc -b` ab. Mach die Änderung danach rückgängig.
6. Führ `npm run build && npm run preview` aus und öffne http://localhost:4173. `vite preview` übernimmt den Proxy, die Produkte erscheinen also auch hier. Der Server ist zum Prüfen des Builds da, nicht für die Produktion.

## Lösung

- `solution/vite.config.ts` – React Compiler, Proxy und `resolve.tsconfigPaths`
- `solution/fetchProducts.ts` und `solution/ProductList.tsx` – relativer API-Pfad, Importe über `@/shop` und `@/errorText`
- `solution/vite.config.test.ts` – Proxy und Alias im echten Dev Server geprüft
- `solution/ProductList.test.tsx`

`npm run build:solution` führt die Tests der Lösung mit `solution/vite.config.ts` aus und baut damit. Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App` und starte `npm run dev:solution`.
