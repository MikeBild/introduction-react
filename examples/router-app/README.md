# Router App

Eine kleine App zum Buchen von Räumen mit Startseite, „Über uns“, Ressourcenliste und Detailseite. Heute läuft sie mit React Router 8. Du portierst sie auf [TanStack Router](https://tanstack.com/router) mit File-based Routing. Danach ist die URL typisierter State: Path Params und Search Params prüft die Route, nicht die Component.

Lektion: **Die URL ist typisierter State** (`react-routing`).

```bash
npm install
npm run dev            # Startpunkt mit React Router
npm run dev:solution   # Lösung mit TanStack Router
npm test
```

## Startpunkt

- `src/routes.tsx` – die Route-Konfiguration für React Router (Data Mode mit `createBrowserRouter`)
- `src/pages/ResourceDetail.tsx` – liest `resourceId` per `useParams` als `string | undefined` und wandelt ihn von Hand um
- `src/pages/Resources.tsx` – hält den Suchtext in `useState`, er geht beim Reload verloren

## Übung

1. Installiert sind schon `@tanstack/react-router` und `@tanstack/router-plugin`. Trag in `vite.config.ts` das Plugin `tanstackRouter({ target: 'react', autoCodeSplitting: true })` **vor** `react()` ein.
2. Leg unter `src/routes/` die Dateien `__root.tsx`, `index.tsx`, `about.tsx`, `resources/index.tsx` und `resources/$resourceId.tsx` an. Das Plugin erzeugt daraus `src/routeTree.gen.ts`. Ersetz in `src/main.tsx` den React-Router-Code durch `createRouter({ routeTree })` und lösch danach `src/routes.tsx`.
3. Parse `resourceId` in der Route mit `params.parse` zu einer `number`. Bei ungültiger oder unbekannter ID wirfst du `notFound()`.
4. Beschreib den Search Param `q` mit einem zod-Schema in `validateSearch`. Das Suchfeld liest `Route.useSearch()` und schreibt per `navigate({ search })`.
5. Zeig unbekannte Pfade über `notFoundComponent` in der Root Route.
6. Entferne `.skip` in `src/routes.test.tsx`. Für TanStack Router renderst du in Tests den `RouterProvider` mit `createMemoryHistory`.

## Lösung

`solution/` ist eine eigene App mit eigenem Vite-Config (`vite.solution.config.ts`):

- `solution/routes/` – die Routen als Dateien
- `solution/routeTree.gen.ts` – vom Plugin erzeugt und eingecheckt, damit `tsc --noEmit` schon vor dem ersten Build läuft
- `solution/router.tsx` – `createAppRouter` und die `Register`-Deklaration für typsichere Links
- `solution/routes.test.tsx` – Tests für Path Param, Search Param und Not Found

```bash
npm run dev:solution
npm run build:solution
```
