*English · [Deutsch](README.de.md)*

# Rendering Performance

The long product table of the workshop shop with 2,000 rows and a note field above it. Every keystroke in the note re-renders the whole table. You measure that first and then fix it with the simplest measure.

Lesson: **Measure first, then optimize** (`react-rendering-performance`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. **Measure:** Start `npm run dev`, open the console, and type into the note. The `<Profiler>` in `src/ProductPage.tsx` reports an `update` of the table with its duration for every keystroke. Look at the same thing in the Profiler tab of the React DevTools.
2. **Move state down:** The note state does not belong in `ProductPage`. Pull label, input, and `useState` into a separate component `NoteField`. The table then no longer renders while you type.
3. Remove `.skip` in `src/ProductPage.test.tsx`. The test counts the calls to `onRender`.
4. **Measure again:** Only when the measurement still shows an expensive render do you use `memo` – and only on that component.

## And the React Compiler?

`vite.config.ts` enables the React Compiler. It memoizes components and JSX automatically. So that you can measure the effect at all, the directive `'use no memo'` switches it off in `ProductPage`. Delete the directive as a test: the test turns green even without the refactoring.

With the compiler you rarely need manual `memo`, `useMemo`, or `useCallback` anymore, for example for code the compiler skips or for values that must stay stable as a dependency of an effect. State colocation helps in any case and additionally makes the code more readable.

## Reference solution

`solution/NoteField.tsx` and `solution/ProductPage.tsx` – deliberately with `'use no memo'` to show that state colocation alone is enough here.
