# Router App

Die Bestellübersicht des Werkstatt-Shops – noch ganz ohne Router. Welche Seite offen ist und welcher Statusfilter gilt, steckt in `useState`. Lädst du neu, drückst „Zurück“ oder teilst einen Link, ist die Ansicht weg.

Lektion: **Die URL ist State, den du teilen kannst** (`react-routing`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Probier es aus: Filter auf „Versendet“, Bestellung öffnen, Seite neu laden. Was bleibt übrig?
2. Leg in `src/routes.tsx` die Routes mit `createBrowserRouter` an und render in `App` einen `RouterProvider` aus `react-router/dom`. Ein Layout `ShopLayout` mit `NavLink` und `Outlet` umschließt die Seiten.
3. Bau die Liste unter `/orders`. Ein `ordersLoader` liest `?status=` aus `request.url`, prüft den Wert mit `readStatus` aus `src/orderStatus.ts` und reicht `request.signal` an `fetchOrders` weiter. Die Component liest die Daten mit `useLoaderData<typeof ordersLoader>()`.
4. Mach aus dem Statusfilter einen Search Param mit `useSearchParams`. Der Filter liegt dann nur noch in der URL, nicht zusätzlich in `useState`.
5. Bau das Detail unter `/orders/:orderId` mit einem `orderLoader`. Gibt es die Bestellung nicht, wirft der Loader `data(null, { status: 404, statusText: 'Not Found' })`.
6. Gib jeder Route eine `ErrorBoundary` mit `useRouteError`, die einen `Link` zurück zur Bestellübersicht zeigt. Den lesbaren Text liefern `httpErrorText` und `errorText` aus `src/errorText.ts`, nicht der rohe Status wie „404 Not Found“.
7. Entferne `.skip` in `src/App.test.tsx`. Die Tests öffnen die App unter einer URL – wie ein geteilter Link.

`src/ordersApi.ts` ist eine Fake-API ohne Netzwerk. Sie antwortet nach 50 ms und lässt sich per `AbortSignal` abbrechen.

## Lösung

- `solution/routes.tsx` – alle Routes mit Loader und `ErrorBoundary`
- `solution/ShopLayout.tsx`, `solution/OrdersPage.tsx`, `solution/OrderPage.tsx`, `solution/RouteError.tsx`
- `solution/App.tsx` – `RouterProvider` mit `createBrowserRouter`
- `solution/routes.test.tsx` – Tests mit `createMemoryRouter`, auch für Loader-Fehler

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
