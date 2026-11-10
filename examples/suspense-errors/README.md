*English · [Deutsch](README.de.md)*

# Suspense and Errors

The order details in the workshop shop: order and shipping status currently load with a custom effect hook. Every component checks loading and error itself, and after an error there is no retry.

Lesson: **Where do you wait, where are errors caught?** (`react-suspense-errors`)

```bash
npm install
npm run dev
npm test
```

In the browser, the shipping status deliberately fails on the first load, and order `o9999` does not exist. That way you see both error cases.

## Exercise

1. Read `src/OrderDetailPage.tsx`. Count how often `loading` and `error` are checked there.
2. Read the order with `use(orderCache.readOrder(orderId))`. The cache in `src/orderCache.ts` puts the promise into a `Map` once per order – never during render. Afterwards, the component only describes the success case.
3. Wrap the region in an `ErrorBoundary` from [react-error-boundary](https://github.com/bvaughn/react-error-boundary) and inside it a `Suspense` with “Bestellung lädt …” (order is loading). Do not write your own class component.
4. Write a `FallbackComponent` with the error’s message and a button “Erneut laden” (reload) that calls `resetErrorBoundary`. The error is `unknown`: `errorText(error, …)` from `src/errorText.ts` checks it and turns it into a readable sentence with a next step.
5. Before the retry, delete the rejected promise: `onReset={() => orderCache.forgetOrder(orderId)}`. Otherwise `use()` delivers the same error again.
6. Give the shipping status its own region with `ErrorBoundary` and `Suspense`. The order then appears immediately, and the shipping status follows or shows “Versandstatus ist gerade nicht verfügbar.” (shipping status is currently unavailable) with the button “Versandstatus erneut laden” (reload shipping status).
7. Remove `.skip` in `src/OrderDetailPage.test.tsx`.

`use()` never sits in a `try`/`catch`; the boundary catches errors.

## Reference solution

`solution/OrderDetailPage.tsx` with two nested regions, `solution/App.tsx`, and the tests in `solution/OrderDetailPage.test.tsx`.

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
