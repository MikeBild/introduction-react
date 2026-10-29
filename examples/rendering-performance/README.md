# Rendering Performance

Die lange Produkttabelle des Werkstatt-Shops mit 2.000 Zeilen und einem Notizfeld darüber. Jeder Tastendruck in der Notiz rendert die ganze Tabelle neu. Du misst das zuerst und behebst es dann mit der einfachsten Maßnahme.

Lektion: **Erst messen, dann optimieren** (`react-rendering-performance`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. **Messen:** Starte `npm run dev`, öffne die Konsole und tipp in die Notiz. Der `<Profiler>` in `src/ProductPage.tsx` meldet für jeden Tastendruck ein `update` der Tabelle mit seiner Dauer. Schau dir dasselbe im Profiler-Tab der React DevTools an.
2. **State nach unten verschieben:** Der Notiz-State gehört nicht in `ProductPage`. Zieh Label, Input und `useState` in eine eigene Component `NoteField`. Die Tabelle bekommt dann beim Tippen kein Rendering mehr.
3. Entferne `.skip` in `src/ProductPage.test.tsx`. Der Test zählt die Aufrufe von `onRender`.
4. **Erneut messen:** Erst wenn die Messung noch ein teures Rendering zeigt, setzt du `memo` ein – und zwar nur an dieser Component.

## Und der React Compiler?

`vite.config.ts` aktiviert den React Compiler. Er memoisiert Components und JSX automatisch. Damit du den Effekt überhaupt messen kannst, schaltet die Direktive `'use no memo'` ihn in `ProductPage` ab. Lösch die Direktive testweise: Der Test wird auch ohne Umbau grün.

Manuelles `memo`, `useMemo` oder `useCallback` brauchst du mit Compiler nur noch selten, etwa für Code, den der Compiler überspringt, oder für Werte, die als Dependency eines Effects stabil bleiben müssen. State Colocation hilft in jedem Fall und macht den Code zusätzlich lesbarer.

## Lösung

`solution/NoteField.tsx` und `solution/ProductPage.tsx` – bewusst mit `'use no memo'`, um zu zeigen, dass State Colocation hier allein reicht.
