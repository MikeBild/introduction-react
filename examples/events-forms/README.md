*English · [Deutsch](README.de.md)*

# Events and Forms

The product page in the workshop shop: below the product there is a form for the quantity. It has no submit handler yet, and nobody checks the stock.

Lesson: **Who owns the value in the input?** (`react-events-forms`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. In `npm run dev`, click “In den Warenkorb” (add to cart). The page reloads, “Im Warenkorb” (in cart) stays at 0. Why?
2. Turn the quantity in `src/AddToCartForm.tsx` into a controlled input: `useState('1')` holds the text, `value` and `onChange` connect it to the field.
3. Derive the number during render (`Number(quantity)`). Disable the button when the quantity is empty or not between 1 and `stock`.
4. Add `onSubmit` to the form, typed with `SubmitEvent<HTMLFormElement>`. Call `event.preventDefault()` and then `onAdd` with the quantity.
5. Remove `.skip` in `src/AddToCartForm.test.tsx`.

## Reference solution

`solution/AddToCartForm.tsx` with tests. To see it in the browser, change the import in `src/App.tsx` to `../solution/AddToCartForm`.
