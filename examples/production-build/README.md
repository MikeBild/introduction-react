# Production Build

Eine React-App, vorbereitet für Production: Config beim Start geprüft, eine Lazy Route, die Bausteine fürs Error Reporting mit [react-error-boundary](https://github.com/bvaughn/react-error-boundary) und ein kleiner Production-Server mit Express 5.

Lektion: **Production beginnt beim Build** (`react-production`)

```bash
npm install
npm run dev
npm test
npm run build
npm start     # Express 5 liefert dist/ aus, http://localhost:4173
```

## Übung

1. Ergänze in `src/errorReporting.ts` jeden Report um die aktuelle Route (`url`) und registriere globale Handler für `error` und `unhandledrejection`.
2. Gib in `src/AppErrorBoundary.tsx` Render Errors über die `onError`-Prop von `ErrorBoundary` an `reportError(error, 'render')` weiter. Leg `AppErrorBoundary` in `src/main.tsx` um `<App />`. Entferne `.skip` in `src/errorReporting.test.tsx`.
3. Führ `npm run build && npm start` aus. `server.ts` liefert `dist/` mit langem Cache für gehashte Assets aus und nimmt unter `/api/client-errors` die Error Reports an – du siehst sie im Terminal. Such in `dist/assets` den eigenen Chunk für `ReportsPage` – und den Wert von `VITE_API_URL` im Bundle. Alles mit `VITE_`-Präfix ist öffentlich.
4. Setz in `.env.local` `VITE_API_URL=not-a-url` und starte die App: Die Config-Prüfung schlägt sofort fehl, nicht erst vor einer Nutzerin.

Eine eigene Error-Boundary-Klasse brauchst du nicht mehr. `react-error-boundary` kapselt die einzige Stelle, an der React noch eine Klasse verlangt.

## Lösung

In `solution/` liegen `errorReporting.ts`, `AppErrorBoundary.tsx`, `main.tsx` und die vollständigen Tests.
