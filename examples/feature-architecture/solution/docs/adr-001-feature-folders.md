*English · [Deutsch](adr-001-feature-folders.de.md)*

# ADR 001: Organize code by features

- Status: accepted
- Date: 2026-10-29

## Context

The shop is growing. In a `components/` folder, cart, catalog, and design system sit side by side. Whoever works on the cart quickly reaches into the internals of the catalog. Every change in the catalog can then break the cart.

## Decision

- Domain code lives under `features/<name>/`. Every feature exports its public API via `index.ts`.
- Other features import only through this `index.ts`, never directly from a file of the feature.
- `ui/` (design system) and `shared/` (domain-free helpers) never import from `features/`.
- Features never import from the app layer (`App.tsx`). The app composes features, not the other way around.
- `architecture.test.ts` checks these rules on every `npm test`.

## Consequences

- You may refactor the internals of a feature as long as the `index.ts` stays the same.
- New dependencies between features become visible in review, because the `index.ts` grows.
- The test reads imports with a regex. It does not recognize dynamic imports or aliases. If that becomes necessary, we switch to `eslint-plugin-boundaries` or `dependency-cruiser`.
