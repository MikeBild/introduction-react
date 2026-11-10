*English · [Deutsch](README.de.md)*

# Context State

The workshop shop keeps its cart (`OrderItem[]`) in Context. The Context has a default object with empty functions. If someone forgets the provider, a click simply does nothing – without an error message.

Lesson: **Context is not a store for everything** (`react-context-state`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Type the Context in `src/cart.tsx` as `CartContextValue | null` and start it with `null` instead of a default object.
2. Stop exporting `CartContext`. Instead, write a Custom Hook `useCart()` that reads the Context with `use` and throws an error when there is no provider: “useCart muss innerhalb von <CartProvider> aufgerufen werden” (useCart must be called inside <CartProvider>).
3. Switch `CartBadge` and `ProductList` to `useCart()`.
4. Use the React 19 syntax `<CartContext value={…}>` instead of `<CartContext.Provider>`.
5. Remove `.skip` in `src/cart.test.tsx`.

Think about it: the cart changes rarely and is needed in several places – a good case for Context. The search text of a single form would not be. You load server data where it is needed (see `examples/data-fetching`).

## Reference solution

`solution/cart.tsx` with `CartProvider` and `useCart`, plus the converted components and tests.
