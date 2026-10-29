# Reducer State Machine

Ein Checkout als State Machine mit `useReducer` und typisierten Actions.

Lektion: **Unmögliche States mit useReducer verhindern** (`react-reducer`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Zeichne die States (`idle`, `submitting`, `success`, `error`) und die erlaubten Übergänge.
2. Lass `checkoutReducer` in `src/checkoutReducer.ts` bei jedem Übergang, den dein Diagramm verbietet, den aktuellen State zurückgeben. Entferne `.skip` in den Tests.
3. Ergänze eine `reset`-Action (`success` → `idle`) und einen Button „New order“ in `src/Checkout.tsx`. Mach aus dem `it.todo` einen Test.

Den Reducer testest du mit Vitest ganz ohne React – er ist eine reine Funktion.

## Lösung

Eine mögliche Lösung liegt in `solution/`.
