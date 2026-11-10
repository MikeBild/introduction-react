*English · [Deutsch](README.de.md)*

# Feature Architecture

The workshop shop, organized by features (`features/`, `ui/`, `shared/`). A test checks the boundaries.

Lesson: **Organize by feature, verify boundaries** (`react-architecture`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Remove `.skip` in `src/architecture.test.ts` and read the reported violation.
2. Fix it: `cart` may use `catalog` only through `features/catalog/index.ts`, the public API of the feature.
3. Turn the `it.todo` into a rule of its own: features never import from the app layer (`App.tsx`).
4. Record the decision as a short Architecture Decision Record, ADR for short (context, decision, consequences), in `docs/adr-001-feature-folders.md`.

## Reference solution

`solution/` contains the corrected code with all three rules in the architecture test and the ADR under `solution/docs/adr-001-feature-folders.md`.
