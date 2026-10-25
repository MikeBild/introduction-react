# Reducer State Machine

A checkout modelled as a state machine with `useReducer` and typed actions.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Draw the states (`idle`, `submitting`, `success`, `error`) and the allowed transitions.
2. Make `checkoutReducer` in `src/checkoutReducer.ts` return the current state for every transition your diagram forbids. Remove `.skip` from the tests.
3. Add a `reset` action (`success` → `idle`) and a "New order" button in `src/Checkout.tsx`. Turn the `it.todo` into a test.

A possible solution lives in `solution/`.
