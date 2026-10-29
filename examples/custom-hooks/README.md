# Custom Hooks

Die Produktsuche des Werkstatt-Shops filtert erst nach einer kurzen Tipp-Pause. Die Debounce-Logik steckt heute direkt in der Component. Du ziehst sie in einen eigenen, generischen Hook.

Lektion: **Custom Hooks teilen Verhalten, nicht State** (`react-custom-hooks`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Leg `src/useDebouncedValue.ts` an und exportiere `useDebouncedValue<T>(value: T, delayMs: number): T`. Übernimm `useState`, `useEffect` und den Cleanup aus `src/ProductSearch.tsx`.
2. Nutze den Hook in `ProductSearch`. Die Component kennt danach keinen Timer mehr.
3. Ersetze in `src/useDebouncedValue.test.ts` den Platzhalter durch den Import deines Hooks und entferne `.skip`. Die Tests nutzen `renderHook` und Fake Timers.
4. Überleg dir: Zwei Components rufen `useDebouncedValue` auf – teilen sie sich den Wert? Warum nicht?

## Lösung

`solution/useDebouncedValue.ts` und `solution/ProductSearch.tsx` mit Tests.
