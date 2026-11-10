*English · [Deutsch](README.de.md)*

# Basic App

The product list of the workshop shop, today still a single component. You break it into small Functional Components and then add a filter and a cart with `useState`.

Lessons: **Thinking of components as functions** (`react-components`) and **State is a snapshot per render** (`react-state-hooks`)

```bash
npm install
npm run dev
npm test
```

The data of the workshop shop lives in `src/shop.ts`: `Product` with `priceCents` and `stock`, `OrderItem`, and the helper functions `formatCents` and `orderTotalCents`.

## Exercise 1 – Components (`react-components`)

1. Draw the component tree of the page.
2. Break `App` in `src/App.tsx` into three Functional Components: `ProductList`, `ProductCard`, and `PriceTag`.
3. Describe the props of each component with a `type`, for example `type ProductCardProps = { name: string; priceCents: number; stock: number }`.
4. Run `npm test`. The existing test stays green, because the UI does not change.

## Exercise 2 – State (`react-state-hooks`)

1. Add a search field with the label “Suche” (search). The search text is state.
2. Compute the filtered list during render. Do not put it into a second state.
3. Show the message `Keine Produkte für „…“. Prüf die Schreibweise oder such nach einem kürzeren Begriff.` (no products for “…”, check the spelling or try a shorter term) when nothing matches.
4. Build a cart: the line items (`OrderItem[]`) are state, each product card gets a button “… in den Warenkorb” (add … to cart), each line item a button “… entfernen” (remove …).
5. Compute the total with `orderTotalCents` during render and show it as “Summe: …” (total) in a region with `aria-label="Warenkorb"` (cart).
6. Create a new array on every update (spread, `map`, `filter`), never `push`.
7. Remove `.skip` in `src/App.test.tsx`.

## Reference solution

- `solution/react-components/` – the split-up list with tests
- `solution/react-state-hooks/` – filter and cart, built on exercise 1

To see a reference solution in the browser, change the import in `src/main.tsx` to `../solution/react-state-hooks/App`.
