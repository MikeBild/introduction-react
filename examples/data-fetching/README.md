*English · [Deutsch](README.de.md)*

# Data Fetching

The product search of the workshop shop reloads on every keystroke. The fetch code sits directly in the component – and has a bug you only see when the network is slow: an old answer can overtake a new one.

Lesson: **Old answers must not overtake new ones** (`react-data-fetching`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` starts a small fake API at `/api/products?q=…`. Short search texts deliberately answer more slowly.

## Exercise

1. In the browser, quickly type “boh” and then “bohrer”. After a good second, the list jumps back to the results for “boh”. The slow answer has overtaken the fast one.
2. In `src/fetchProducts.ts`, write a function `fetchProducts(search, signal)`. On HTTP errors it throws an `HttpError` from `src/errorText.ts` itself, treats the response as `unknown`, and checks it with a type guard before returning a `Product[]`.
3. Write a hook `useProducts(search)` in `src/useProducts.ts`. Model the status as a union type `LoadState<T>` with `loading`, `error`, and `success`. The message in the `error` status comes from `errorText(error)`: a readable sentence with a next step instead of `String(error)`. In the cleanup of the effect, abort the request with an `AbortController`.
4. Use the hook in a `ProductList` and delete the old fetch code from `ProductSearch`.
5. Remove `.skip` in `src/ProductSearch.test.tsx`. The tests answer requests in the wrong order and with status 500.

`use` and `Suspense` come later in the lesson **Where do you wait, where are errors caught?** (`examples/suspense-errors`). Cache, deduplication, and retries are shown in the extra chapter TanStack Query (`examples/tanstack-query`).

## Reference solution

- `solution/fetchProducts.ts` – load, check status, check response
- `solution/useProducts.ts` – effect with `AbortController`, result together with its search text
- `solution/ProductList.tsx` and `solution/ProductSearch.tsx` – with a hint on what you can do with zero results
- `solution/ProductSearch.test.tsx` – race condition, abort, HTTP error, invalid response

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
