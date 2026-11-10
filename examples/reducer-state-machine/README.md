*English · [Deutsch](README.de.md)*

# Reducer State Machine

The checkout and an order of the workshop shop as state machines with `useReducer` and typed actions.

Lesson: **Prevent impossible states with useReducer** (`react-reducer`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Draw the states of the checkout (`idle`, `submitting`, `success`, `error`) and the allowed transitions.
2. Make `checkoutReducer` in `src/checkoutReducer.ts` return the current state on every forbidden transition. Remove `.skip` in `src/checkoutReducer.test.ts`. Add a `reset` action (`success` → `idle`) and turn the `it.todo` into a test.
3. In `src/orderReducer.ts`, model the status sequence of an order: `draft → placed → paid → shipped`, `cancelled` only from `draft` or `placed`. `placed` is only possible with at least one line item, and from `placed` on, the line items no longer change.
4. Remove `.skip` in `src/orderReducer.test.ts` and `src/OrderStatusPanel.test.tsx`.

You test the reducers with Vitest entirely without React – they are Pure Functions. The domain with `Order`, `OrderItem`, and the branded IDs lives in `src/shop.ts`.

## Reference solution

A reference solution is in `solution/`: `checkoutReducer.ts`, `orderReducer.ts` with a table of the allowed predecessor statuses, the matching components, and all tests.
