*English · [Deutsch](README.de.md)*

# SSR App

The product page of the workshop shop with server-side rendering: the server renders finished HTML via `renderToPipeableStream` and streams it to the browser. The page looks complete right away – but the “In den Warenkorb” (add to cart) button does not respond.

Extra chapter: **When are server components worth it?** (`react-server-components`)

```bash
npm install
npm run dev          # starting point with Vite in middleware mode, http://localhost:5173
npm test
npm run build
npm start            # production server from dist/
```

Node 26 runs `server.ts` directly (type stripping), you do not need a separate build step for it.

## Structure

| File                      | Runs on | Purpose                                                      |
| ------------------------- | ------- | ------------------------------------------------------------ |
| `server.ts`               | server  | Express 5 server, loads data, streams HTML into `index.html` |
| `src/entry-server.tsx`    | server  | `render()` with `renderToPipeableStream`                     |
| `src/productPage.ts`      | server  | `loadProductPage()`, types and type guard of the data        |
| `src/App.tsx`             | both    | product page with description, price, stock, reviews         |
| `src/AddToCartButton.tsx` | both    | the only interactive part (`useState`)                       |
| `src/entry-client.tsx`    | browser | client entry, loaded by `index.html`                         |

## Exercise

1. Start `npm run dev` and open the page. Disable JavaScript in the DevTools and reload: what does the server already show, what is missing?
2. Enable JavaScript again and click the button. The counter stays at 0. Find out why: the script runs (`data-client-loaded` on the `<html>` element), but no React code takes over the server HTML.
3. Add the hydration in `src/entry-client.tsx`: read the initial data from `<script id="initial-data">`, check it with `isProductPageData`, and call `hydrateRoot` with the same data as the server. Watch the console: a hydration mismatch appears there as an error.
4. Sketch which parts of the page would be Server Components today and where the `'use client'` boundary would run. How much JavaScript would the browser still need then?

## Findings in the starting point

The server delivers complete HTML and the data as JSON. The client script is loaded but calls neither `hydrateRoot` nor `createRoot`. That is why no event handlers are attached to the buttons, and the counter stays at “Im Warenkorb: 0” (in cart: 0) after every click. A `createRoot` instead of `hydrateRoot` would throw away the server HTML and rebuild it – the button would work then, but the advantage of the server HTML would be wasted.

## Reference solution

- `solution/hydrate.tsx` – `hydrateRoot` with the same `App` and the same data
- `solution/entry-client.tsx` – reads and checks the initial data, starts the hydration
- `solution/hydrate.test.tsx` – checks in jsdom: no mismatch, button clickable, DOM taken over from the server
- `solution/SERVER-COMPONENTS.md` – sketch with Server Components and the `'use client'` boundary

The reference solution runs with its own HTML entry (`solution.html`):

```bash
npm run dev:solution
npm run build && npm run start:solution
```
