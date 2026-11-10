*English · [Deutsch](README.de.md)*

# Styling with Tailwind

The checkout form of the workshop shop with line items and total, styled with global CSS from `src/styles.css`. Every class like `.btn` applies everywhere in the app – whoever changes it changes every button. You move the styles into the component and build a button with three variants.

Lesson: **Styles belong with the component** (`react-styling`)

```bash
npm install
npm run dev
npm test
```

[Tailwind CSS v4](https://tailwindcss.com) is already set up: the plugin `@tailwindcss/vite` is in `vite.config.ts`, and `src/tailwind.css` contains `@import 'tailwindcss'`. You do not need a `tailwind.config.js`.

Products, line items, and `formatCents` come from `src/shop.ts`, the shared domain of the workshop shop. The app calculates amounts in whole cents.

## Exercise

1. In `src/App.tsx`, import `./tailwind.css` instead of `./styles.css` and delete `src/styles.css`.
2. Build `src/Button.tsx` with three variants. Put the classes into a map `variantClasses` and derive the type of the prop from it (`keyof typeof variantClasses`):
   - `primary`: `bg-blue-700 text-white hover:bg-blue-800`
   - `secondary`: `bg-white text-slate-900 border border-slate-300`
   - `danger`: `bg-red-700 text-white hover:bg-red-800`
3. Write every class out in full. Tailwind only finds classes that appear literally in the code – it does not recognize `bg-${color}-600`.
4. In `src/CheckoutForm.tsx`, replace the three buttons with `<Button>` and the remaining classes (`checkout-form`, `field`, `actions`, `order-summary`, `total`) with utilities.
5. Remove `.skip` in `src/CheckoutForm.test.tsx`.
6. Check with `npm run build` that the CSS file in `dist/assets` contains exactly the utilities you use.

## Reference solution

`solution/Button.tsx`, `solution/CheckoutForm.tsx`, `solution/App.tsx`, and the tests.

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
