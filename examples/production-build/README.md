# Production Build

Eine React-App, vorbereitet für Production: Config mit [zod](https://zod.dev) geprüft, eine Lazy Route und die Bausteine fürs Error Reporting mit [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

Lektion: **Production beginnt beim Build** (`react-production`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Ergänze in `src/errorReporting.ts` jeden Report um die aktuelle Route (`url`) und registriere globale Handler für `error` und `unhandledrejection`.
2. Gib in `src/AppErrorBoundary.tsx` Render Errors über die `onError`-Prop von `ErrorBoundary` an `reportError(error, 'render')` weiter. Leg `AppErrorBoundary` in `src/main.tsx` um `<App />`. Entferne `.skip` in `src/errorReporting.test.tsx`.
3. Führ `npm run build && npm run preview` aus. Such in `dist/assets` den eigenen Chunk für `ReportsPage` – und den Wert von `VITE_API_URL` im Bundle. Alles mit `VITE_`-Präfix ist öffentlich.
4. Setz in `.env.local` `VITE_API_URL=not-a-url` und starte die App: Die Config-Prüfung schlägt sofort fehl, nicht erst vor einer Nutzerin.

Eine eigene Error-Boundary-Klasse brauchst du nicht mehr. `react-error-boundary` kapselt die einzige Stelle, an der React noch eine Klasse verlangt.

## Lösung

In `solution/` liegen `errorReporting.ts`, `AppErrorBoundary.tsx`, `main.tsx` und die vollständigen Tests.
