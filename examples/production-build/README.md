*English · [Deutsch](README.de.md)*

# Production build

The dashboard of the workshop shop, prepared for production: config checked at startup, a lazy route, the building blocks for error reporting with [react-error-boundary](https://github.com/bvaughn/react-error-boundary), and a small production server with Express 5.

Lesson: **Production starts with the build** (`react-production`)

```bash
npm install
npm run dev
npm test
npm run build
npm start     # Express 5 serves dist/, http://localhost:4173
```

## Exercise

1. In `src/errorReporting.ts`, add the current route (`url`) to every report and register global handlers for `error` and `unhandledrejection`.
2. In `src/AppErrorBoundary.tsx`, pass render errors on to `reportError(error, 'render')` via the `onError` prop of `ErrorBoundary`. Wrap `<App />` in `AppErrorBoundary` in `src/main.tsx`. Remove `.skip` in `src/errorReporting.test.tsx`.
3. Run `npm run build && npm start`. `server.ts` serves `dist/` with a long cache for hashed assets and accepts the error reports at `/api/client-errors` – you see them in the terminal. Look in `dist/assets` for the separate chunk for `ReportsPage` – and for the value of `VITE_API_URL` in the bundle. Everything with the `VITE_` prefix is public.
4. Set `VITE_API_URL=not-a-url` in `.env.local` and start the app: the config check fails immediately, not in front of a user.

You no longer need your own Error Boundary class. `react-error-boundary` encapsulates the only place where React still requires a class.

## Reference solution

`solution/` contains `errorReporting.ts`, `AppErrorBoundary.tsx`, `main.tsx`, and the complete tests.
