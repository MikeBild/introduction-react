*English · [Deutsch](README.de.md)*

# Vite Setup

The product list of the workshop shop in a fresh Vite project. The products come from a small fake API on port 3000, the dev server runs on port 5173 – and exactly in between, something is still stuck.

Extra chapter: **Vite starts your project in seconds** (`react-vite-setup`)

```bash
npm install
npm run api   # terminal 1: fake API at http://localhost:3000/api/products
npm run dev   # terminal 2: dev server at http://localhost:5173
npm test
npm run build # tsc -b && vite build
npm run preview
```

## How the project was created

```bash
npm create vite@latest vite-setup -- --template react-ts
```

The demo assets and the CSS were removed from the template. Added were the React Compiler, Vitest with Testing Library, `src/shop.ts`, and the fake API `api-server.ts`. Everything else is as `npm create vite` sets it up:

- `index.html` in the project root is the entry point and loads `src/main.tsx` as a module.
- `tsconfig.json` points to `tsconfig.app.json` (code in the browser) and `tsconfig.node.json` (config and server in Node).
- `npm run build` first calls `tsc -b` and then `vite build`.

If you like, create the template yourself once in an empty folder and compare the files. Vite 8 needs Node.js 20.19 or 22.12 and newer; the examples here run with Node.js 26.

## Exercise

1. Start `npm run api` and `npm run dev` and open the app. Instead of the products you see an error message (the text comes from `errorText` in `src/errorText.ts`), and in the DevTools console a CORS error (Cross-Origin Resource Sharing). `src/features/products/fetchProducts.ts` calls `http://localhost:3000` directly, that is, a second origin, and the fake API does not allow that.
2. Change the URL in `fetchProducts.ts` to the relative path `/api/products`. Now the dev server itself answers – with the `index.html`, which is why the message reads “Der Server hat kein gültiges JSON geschickt” (the server did not send valid JSON). Add a proxy in `vite.config.ts`: `server: { proxy: { '/api': 'http://localhost:3000' } }`. After the restart you see the products, and the requests arrive in the terminal of the fake API. You do not have to open up CORS for that. Remove `.skip` in `src/features/products/ProductList.test.tsx` and on the proxy test in `vite.config.test.ts`.
3. In `ProductList.tsx` and `fetchProducts.ts`, replace the imports `../../shop` and `../../errorText` with `@/shop` and `@/errorText`. `npm run typecheck` stays green, because `tsconfig.app.json` knows the alias under `paths`. The dev server, however, reports “Failed to resolve import”: Vite does not read `paths` on its own. Add `resolve: { tsconfigPaths: true }` in `vite.config.ts`, then you maintain aliases only in the tsconfig. Remove `.skip` on the alias test in `vite.config.test.ts`. Vitest uses the same configuration, so the tests find the alias as well.
4. Compare dev server and build. In the Network tab of the DevTools, the browser loads every module individually in development, for example `/src/features/products/ProductList.tsx`. Run `npm run build` and look into `dist/assets`: there is a single bundled script with a hash in its name.
5. Vite transpiles, `tsc` checks. In `src/shop.ts`, set `priceCents: '89,90'` on the first product. `npx vite build` still builds, because Vite only strips the types. `npm run build` already stops at `tsc -b`. Revert the change afterwards.
6. Run `npm run build && npm run preview` and open http://localhost:4173. `vite preview` takes over the proxy, so the products appear here as well. The server is there to check the build, not for production.

## Reference solution

- `solution/vite.config.ts` – React Compiler, proxy, and `resolve.tsconfigPaths`
- `solution/fetchProducts.ts` and `solution/ProductList.tsx` – relative API path, imports via `@/shop` and `@/errorText`
- `solution/vite.config.test.ts` – proxy and alias checked in the real dev server
- `solution/ProductList.test.tsx`

`npm run build:solution` runs the tests of the reference solution with `solution/vite.config.ts` and builds with it. To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App` and start `npm run dev:solution`.
