*English · [Deutsch](README.de.md)*

# Custom Hooks

The product search of the workshop shop filters only after a short typing pause. The debounce logic currently sits directly in the component. You extract it into your own generic hook.

Lesson: **Custom hooks share behavior, not state** (`react-custom-hooks`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Create `src/useDebouncedValue.ts` and export `useDebouncedValue<T>(value: T, delayMs: number): T`. Take over `useState`, `useEffect`, and the cleanup from `src/ProductSearch.tsx`.
2. Use the hook in `ProductSearch`. Afterwards, the component no longer knows about a timer.
3. In `src/useDebouncedValue.test.ts`, replace the placeholder with the import of your hook and remove `.skip`. The tests use `renderHook` and fake timers.
4. Think about it: two components call `useDebouncedValue` – do they share the value? Why not?

## Reference solution

`solution/useDebouncedValue.ts` and `solution/ProductSearch.tsx` with tests.
