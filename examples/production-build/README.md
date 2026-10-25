# Production Build

A React app prepared for production: config validated with [zod](https://zod.dev), a lazily loaded route and the building blocks for error reporting.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Add the current route (`url`) to every report in `src/errorReporting.ts` and register global handlers for `error` and `unhandledrejection`.
2. Implement `componentDidCatch` in `src/ErrorBoundary.tsx` so it calls `onError`, then wrap `<App />` in `src/main.tsx`. Remove `.skip` from the tests.
3. Run `npm run build && npm run preview`. Find the separate `ReportsPage` chunk in `dist/assets` – and the value of `VITE_API_URL` in the bundle.
4. Set `VITE_API_URL=not-a-url` in `.env.local` and start the app: the config check fails right away.

A possible solution lives in `solution/`.
