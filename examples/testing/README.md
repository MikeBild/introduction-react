*English · [Deutsch](README.de.md)*

# Testing

The finished checkout of the workshop shop: it validates with the shared schema `PlaceOrderInput` and sends the order via `POST /api/orders`. What is missing are the tests. You write them with Vitest and Testing Library and replace `fetch` in the test with a stub.

Lesson: **Test what users see and do** (`react-testing`)

```bash
npm install
npm run dev
npm test
```

In dev mode, a small fake API in `vite.config.ts` answers the request; every order succeeds. In the tests there is no server:

- `mockFetchResponse(status, body)` from `src/test/mockFetchResponse.ts` replaces `fetch` via `vi.stubGlobal` and returns the mock.
- `src/test/setup.ts` loads the jest-dom matchers and calls `cleanup()` and `vi.unstubAllGlobals()` after every test.

## Exercise

Replace the three `it.todo` in `src/CheckoutForm.test.tsx` with real tests. Structure each test as Arrange, Act, Assert.

1. **Success case:** Answer with `mockFetchResponse(201, { id: 'o1004' })`. Choose a customer, click “Bestellen” (order), and expect “Bestellung o1004 ist eingegangen” (order o1004 has been received). Also check what is in the request body.
2. **Validation error:** Set a quantity to `0`. Use `toHaveAccessibleDescription` to check that the message is attached to the field, and make sure with `expect(fetchMock).not.toHaveBeenCalled()` that no request goes out.
3. **Server error:** Answer with status 500. Expect “Die Bestellung ist fehlgeschlagen. Der Server hat gerade ein Problem.” (the order failed, the server currently has a problem) in the `alert` role.

Rules along the way:

- Find elements by role and label (`getByRole`, `getByLabelText`), not by CSS classes or test IDs.
- Interact with `userEvent.setup()`, not with `fireEvent`.
- Wait with `findBy…` for text that only appears after the request.
- Mock only the boundary to the outside, here `fetch`. Form and schema run for real.

## Reference solution

`solution/CheckoutForm.test.tsx` contains the three tests and a fourth: a stock error with status 409 that appears at the line item.
