*English · [Deutsch](README.de.md)*

# Forms Validation

The checkout of the workshop shop, validated with the shared [zod](https://zod.dev) schema `PlaceOrderInput`. The backend uses the same schema. Errors appear at their field.

Lesson: **One schema for form, server, and type** (`react-forms-validation`)

```bash
npm install
npm run dev
npm test
```

## Structure

| File                     | Purpose                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `src/placeOrderInput.ts` | the shared schema `PlaceOrderInput`, unchanged from the backend           |
| `src/fieldErrors.ts`     | `toFieldErrors` turns issues into texts per path, e.g. `items.0.quantity` |
| `src/placeOrder.ts`      | fake server: validates again and checks the stock                         |
| `src/CheckoutForm.tsx`   | the checkout with customer and quantities                                 |
| `src/shop.ts`            | domain of the workshop shop: products, customers, branded IDs             |

## Exercise

1. In `handleSubmit`, bring the quantities from the form into the shape of the schema: `FormData` delivers text, `PlaceOrderInput` wants numbers. Build `items` from the cart and the inputs, then call `safeParse`.
2. Show errors at the quantity: create a component `QuantityField` that reads the error under the key `items.${index}.quantity` and links it to the field via `aria-invalid` and `aria-describedby`.
3. Show server errors at the matching field instead of in the banner. Try it with the sold-out socket wrench set: the server answers with the path `items.1.quantity`.
4. Remove `.skip` in `src/CheckoutForm.test.tsx`.

The schema stays free of text. The UI phrases the error messages in `src/fieldErrors.ts`.

## Reference solution

A reference solution is in `solution/`: `CheckoutForm.tsx`, `QuantityField.tsx`, and the tests.
