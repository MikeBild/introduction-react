*English · [Deutsch](README.de.md)*

# Router App

The order overview of the workshop shop – still entirely without a router. Which page is open and which status filter applies lives in `useState`. Reload, press “Back”, or share a link, and the view is gone.

Lesson: **The URL is state you can share** (`react-routing`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Try it out: set the filter to “Versendet” (shipped), open an order, reload the page. What is left?
2. In `src/routes.tsx`, create the routes with `createBrowserRouter` and render a `RouterProvider` from `react-router/dom` in `App`. A layout `ShopLayout` with `NavLink` and `Outlet` wraps the pages.
3. Build the list under `/orders`. An `ordersLoader` reads `?status=` from `request.url`, checks the value with `readStatus` from `src/orderStatus.ts`, and passes `request.signal` on to `fetchOrders`. The component reads the data with `useLoaderData<typeof ordersLoader>()`.
4. Turn the status filter into a search param with `useSearchParams`. The filter then lives only in the URL, not additionally in `useState`.
5. Build the detail under `/orders/:orderId` with an `orderLoader`. If the order does not exist, the loader throws `data(null, { status: 404, statusText: 'Not Found' })`.
6. Give every route an `ErrorBoundary` with `useRouteError` that shows a `Link` back to the order overview. The readable text comes from `httpErrorText` and `errorText` in `src/errorText.ts`, not the raw status like “404 Not Found”.
7. Remove `.skip` in `src/App.test.tsx`. The tests open the app at a URL – like a shared link.

`src/ordersApi.ts` is a fake API without a network. It answers after 50 ms and can be aborted via `AbortSignal`.

## Reference solution

- `solution/routes.tsx` – all routes with loader and `ErrorBoundary`
- `solution/ShopLayout.tsx`, `solution/OrdersPage.tsx`, `solution/OrderPage.tsx`, `solution/RouteError.tsx`
- `solution/App.tsx` – `RouterProvider` with `createBrowserRouter`
- `solution/routes.test.tsx` – tests with `createMemoryRouter`, including loader errors

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
