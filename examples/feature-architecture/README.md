# Feature Architecture

A small shop structured by features (`features/`, `ui/`, `shared/`) with boundaries checked by a test.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Remove `.skip` in `src/architecture.test.ts` and read the reported violation.
2. Fix it: `cart` may use `catalog` only through `features/catalog/index.ts`, its public API.
3. Turn the `it.todo` into a rule: features never import from the app layer (`App.tsx`).
4. Record the decision as a short ADR (context, decision, consequences) in `docs/adr-001-feature-folders.md`.
