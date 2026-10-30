# Reducer State Machine

Der Checkout und eine Bestellung des Werkstatt-Shops als State Machines mit `useReducer` und typisierten Actions.

Lektion: **Unmögliche States mit useReducer verhindern** (`react-reducer`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Zeichne die States des Checkouts (`idle`, `submitting`, `success`, `error`) und die erlaubten Übergänge.
2. Lass `checkoutReducer` in `src/checkoutReducer.ts` bei jedem verbotenen Übergang den aktuellen State zurückgeben. Entferne `.skip` in `src/checkoutReducer.test.ts`. Ergänze eine `reset`-Action (`success` → `idle`) und mach aus dem `it.todo` einen Test.
3. Bilde in `src/orderReducer.ts` die Statusfolge einer Bestellung ab: `draft → placed → paid → shipped`, `cancelled` nur aus `draft` oder `placed`. `placed` geht nur mit mindestens einer Position, und ab `placed` ändern sich die Positionen nicht mehr.
4. Entferne `.skip` in `src/orderReducer.test.ts` und `src/OrderStatusPanel.test.tsx`.

Die Reducer testest du mit Vitest ganz ohne React – sie sind Pure Functions. Die Domäne mit `Order`, `OrderItem` und den Branded IDs liegt in `src/shop.ts`.

## Lösung

Eine mögliche Lösung liegt in `solution/`: `checkoutReducer.ts`, `orderReducer.ts` mit einer Tabelle der erlaubten Vorgänger-Status, die passenden Components und alle Tests.
