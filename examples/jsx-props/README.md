*English · [Deutsch](README.de.md)*

# JSX and Props

A card for a cart entry in the workshop shop. Its props contract is too loose and too strict at the same time: `variant` accepts any string, and every field is required. You write a contract that finds typos and only requires what is really necessary.

Lesson: **JSX is JavaScript, props are the contract** (`react-jsx-props`)

```bash
npm install
npm run dev
npm test
npm run typecheck
```

## Exercise

1. Start the app. The second card does not look compact – why does TypeScript not report the error?
2. Type `variant` in `src/CartItemCard.tsx` as the union type `'default' | 'compact' | 'highlighted'`. Now `npm run typecheck` shows the typo in `src/App.tsx`. Fix it.
3. Make `quantity`, `variant`, and `note` optional. Set default values directly in the destructuring: quantity 1, variant `'default'`.
4. In `src/typeChecks.tsx`, remove the `// ` at the start of the commented-out lines. `npm run typecheck` must then run without errors. The lines with `@ts-expect-error` check that wrong calls still fail.
5. Add a test for quantity 1 without specifying it.

## Reference solution

`solution/CartItemCard.tsx`, `solution/typeChecks.tsx`, and `solution/CartItemCard.test.tsx`. To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
