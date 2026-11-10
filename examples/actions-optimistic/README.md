*English · [Deutsch](README.de.md)*

# Actions Optimistic

The cart of the workshop shop with a Form Action from React 19 and `useActionState`. The fake server takes a second and rejects line items when the stock is not sufficient – ready for `useOptimistic`.

Lesson: **Optimistic UI needs a way back** (`react-actions-optimistic`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Move the submit button into its own component `SubmitButton` and read the pending state there with `useFormStatus` from `react-dom`.
2. Show a new line item in `src/Cart.tsx` immediately with `useOptimistic`, grayed out while the server saves. `mergeItem` from `src/cartApi.ts` helps you merge identical products.
3. Put the socket wrench set into the cart: it is sold out. The optimistic line item disappears, and the message appears.
4. Remove `.skip` in `src/Cart.test.tsx`.

Optimistic updates fit here because a line item in a draft is saved almost every time. For payment you would do without them.

## Reference solution

A reference solution is in `solution/`: `Cart.tsx`, `SubmitButton.tsx`, and the tests.
