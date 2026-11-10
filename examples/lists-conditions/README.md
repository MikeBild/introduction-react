*English · [Deutsch](README.de.md)*

# Lists and Conditions

The order overview of the workshop shop only knows the happy path and uses the position in the list as the key. You add dedicated views for loading, error, and empty, and give every entry a stable key.

Lesson: **Keys are identity, not position** (`react-lists-conditions`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Start the app, tick the checkbox on order o1001, and click “Neue Bestellung oben einfügen” (insert new order at the top). Watch which order the checkmark is on now.
2. In `src/OrderOverview.tsx`, replace the index as key with `order.id`. Repeat step 1.
3. Add dedicated views for the three other situations from `OrdersState`:
   - Loading: `<p role="status">Bestellungen werden geladen …</p>`
   - Error: an element with `role="alert"` that shows the message from the state and names the next step: “Lade die Seite neu und versuch es noch einmal.” (reload the page and try again)
   - Empty: “Noch keine Bestellungen. Sobald jemand bestellt, erscheint die Bestellung hier.” (no orders yet, as soon as someone orders, the order appears here) instead of an empty list
4. Remove `.skip` in `src/OrderOverview.test.tsx` step by step.

The orders come from `src/shop.ts`: `Order` with `status`, `customerId`, and `items`. You compute the total with `orderTotalCents`.

Tip: a `switch` over `state.status` lets TypeScript check that you have not forgotten a case.

## Reference solution

`solution/OrderOverview.tsx` with tests in `solution/OrderOverview.test.tsx`. To see the reference solution in the browser, change the import in `src/App.tsx` to `../solution/OrderOverview`.
