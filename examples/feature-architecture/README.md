# Feature Architecture

Der Werkstatt-Shop, nach Features geordnet (`features/`, `ui/`, `shared/`). Ein Test prüft die Boundaries.

Lektion: **Nach Features ordnen, Boundaries prüfen** (`react-architecture`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Entferne `.skip` in `src/architecture.test.ts` und lies den gemeldeten Verstoß.
2. Behebe ihn: `cart` darf `catalog` nur über `features/catalog/index.ts` nutzen, die Public API des Features.
3. Mach aus dem `it.todo` eine eigene Regel: Features importieren nie aus der App-Schicht (`App.tsx`).
4. Halte die Entscheidung als kurzes Architecture Decision Record, kurz ADR (Kontext, Entscheidung, Konsequenzen), in `docs/adr-001-feature-folders.md` fest.

## Lösung

`solution/` enthält den korrigierten Code mit allen drei Regeln im Architecture Test und das ADR unter `solution/docs/adr-001-feature-folders.md`.
