*English · [Deutsch](README.de.md)*

# Generic Components

The customer list of the workshop shop as a table, hard-wired to the type `Customer`. For products you would need a copy. Instead, you build a generic `DataTable<T>` that preserves the caller’s type.

Lesson: **Generics preserve the caller’s type** (`react-generic-components`)

```bash
npm install
npm run dev
npm test
npm run typecheck
```

## Exercise

1. Create `src/DataTable.tsx` with a component `DataTable<T>` and the props `rows: readonly T[]`, `columns: readonly Column<T>[]`, and `getRowKey: (row: T) => string`.
2. Define `Column<T>` as a union type: a column either shows a field (`field: keyof T & string`) or renders itself (`render: (row: T) => ReactNode`). Both have a `header`.
3. In `src/App.tsx`, replace the `CustomerTable` with `DataTable` with columns for name, email, and revenue. The test in `src/App.test.tsx` must stay green.
4. In `src/typeChecks.tsx`, remove the `// ` at the start of the lines. `npm run typecheck` must run without errors: the same table works for products, and a wrong field name fails.
5. Check your code: no `any`, no `as`. Tip: in a `.tsx` file you write a generic arrow function as `<T,>(…) =>`.

## Reference solution

`solution/DataTable.tsx`, `solution/App.tsx`, `solution/typeChecks.tsx`, and `solution/DataTable.test.tsx`. To see the reference solution in the browser, change the import in `src/main.tsx` to `../solution/App`.
