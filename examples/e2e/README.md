*English · [Deutsch](README.de.md)*

# E2E tests with Playwright

The finished checkout of the workshop shop with a real API: the form validates with the shared schema `PlaceOrderInput`, the API in `server/api.ts` checks customer and stock and saves the order. What is missing are the end-to-end tests. You write them with Playwright: a real browser operates the app, nothing is stubbed.

Lesson: **E2E tests protect the most important paths** (`react-e2e-playwright`)

```bash
npm install
npx playwright install chromium   # once: downloads the browser for the tests
npm test                          # starts API and app, runs all tests
npm run test:ui                   # the same tests step by step in UI mode
```

Playwright starts the API (`http://127.0.0.1:3030`) and the app (`http://127.0.0.1:5173`) itself, see `webServer` in `playwright.config.ts`. To try it in the browser, start both by hand: `npm run api` and `npm run dev` in two terminals.

## Structure

| File                     | Purpose                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `playwright.config.ts`   | `webServer` for API and app, `baseURL`, Chromium, trace on failure                         |
| `e2e/checkout.spec.ts`   | starting point: one example test and two tests with `.skip`                                |
| `server/api.ts`          | Express API: `POST /api/orders` validates, checks stock, saves                             |
| `src/CheckoutForm.tsx`   | the checkout with customer and quantities, errors at the field, order number in the status |
| `src/placeOrderInput.ts` | the shared zod schema, form and API use the same one                                       |
| `vite.config.ts`         | fixed port 5173, `/api` goes to the API via proxy                                          |

## Which level checks what?

| Level            | Count | Duration     | Runs against                    | Example in the shop                                                      |
| ---------------- | ----- | ------------ | ------------------------------- | ------------------------------------------------------------------------ |
| Component test   | many  | milliseconds | one component in jsdom          | The field shows “Bitte eine ganze Zahl ab 1” (whole number of 1 or more) |
| Integration test | some  | milliseconds | the API with a real database    | `POST /api/orders` answers with 409                                      |
| E2E test         | few   | seconds      | browser, app, API, and database | The order arrives with a number                                          |

Everything that can be checked faster and more precisely one level down belongs there. The lesson **Test what users see and do** (`react-testing`, example [`testing`](../testing/README.md)) shows the component tests for the same checkout.

## Exercise

In `e2e/checkout.spec.ts`, replace the two `test.skip` with real tests. Structure each test as Arrange, Act, Assert.

1. **Happy path “place order”:** Choose “Ada Schmidt” as the customer, set the quantity for the torque wrench to `2`, and click “Bestellen” (order). Expect the text “Bestellung o… ist eingegangen” (order o… has been received) in the `status` role. The server assigns the number, so check it with a pattern like `/Bestellung o\d+ ist eingegangen/`.
2. **Error path “validation”:** Set the quantity to `0` and click “Bestellen”. Use `toHaveAccessibleDescription` to check that “Bitte eine ganze Zahl ab 1” is attached to the field, and that there is no order number (`toHaveCount(0)` on the `status` role).

Rules along the way:

- Find elements by role and label (`getByRole`, `getByLabel`), not by CSS selectors or test IDs.
- Never wait with `waitForTimeout`. Actions wait on their own until the element is ready, and `expect(locator)` repeats the check until the timeout.
- Every test starts with `page.goto('/')` and sets up its own state. Playwright gives it its own browser context.

## Flaky tests

A test is flaky when it is sometimes red and sometimes green without the code changing.

| Flaky because …                         | Remedy                                                       |
| --------------------------------------- | ------------------------------------------------------------ |
| fixed wait (`waitForTimeout`, sleep)    | use the auto-waiting of actions and `expect(locator)`        |
| shared state between tests              | own browser context per test, Playwright does this itself    |
| data that another test changes          | create fixed data per test, no counting across all tests     |
| order of the tests                      | every test must pass on its own (`npx playwright test -g …`) |
| CSS selector that breaks on refactoring | `getByRole` and `getByLabel` instead of classes and IDs      |

With `--retries=2` a red test runs once more; if it then passes, Playwright reports it as _flaky_ instead of passed. You find the cause in the Trace Viewer: `npx playwright show-trace test-results/<test>/trace.zip` shows screenshot, DOM, and requests for each step.

## Reference solution

`solution/checkout.spec.ts` contains both tests and a third one: a stock error that only the real API knows (“Nur 4 auf Lager”, only 4 in stock, shown at the field). The happy path additionally checks via `request.get('/api/orders/<id>')` that the order is on the server. `npm test` runs the starting point and the reference solution.
