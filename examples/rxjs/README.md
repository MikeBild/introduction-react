*English · [Deutsch](README.de.md)*

# RxJS

The product search of the workshop shop with a hand-rolled debounce: a `setTimeout` in the effect, plus `fetch` without abort and without error handling. Debounce, cancellation, and errors are processes over time – that is exactly what RxJS is built for.

Extra chapter: **When is RxJS worth it in React?** (`react-rxjs`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` starts a fake API at `/api/products?q=…`. Short search texts deliberately answer more slowly.

## Exercise

1. In the browser, type “boh”, wait briefly, and keep typing until “bohrer”. Shortly afterwards, the list jumps back to the results for “boh”.
2. In `src/createProductSearch.ts`, build a function `createProductSearch()` without React: a `Subject<string>` takes the inputs, `debounceTime(300)` and `distinctUntilChanged()` filter, `switchMap` loads via `fromFetch` and cancels the old search. `catchError` in the inner stream delivers an empty list on errors.
3. Write a hook `useObservable(source$, initialValue)` that subscribes in the effect and unsubscribes in the cleanup.
4. In `ProductSearch`, create one search per component with `useState(createProductSearch)` and show the results via `useObservable`. Delete the effect and the timeout.
5. Remove `.skip` in `src/ProductSearch.test.tsx`.

## When is it worth it?

RxJS is worth it for time-based logic, multiple sources, and retries. For one value per render, state and hooks are enough – compare the code with the hook `useProducts` from `examples/data-fetching`. Never pass an Observable in props or Context: React only gets the last value.

## Reference solution

- `solution/createProductSearch.ts` – the stream with `debounceTime`, `switchMap`, and `catchError`
- `solution/useObservable.ts` – the hook between stream and state
- `solution/ProductSearch.tsx` and `solution/App.tsx`
- `solution/createProductSearch.test.ts` – the stream without React, with fake timers
- `solution/ProductSearch.test.tsx` – cancellation, order, errors

To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
