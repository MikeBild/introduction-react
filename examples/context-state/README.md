# Context State

Ein Shop mit Warenkorb im Context. Der Context hat ein Default-Objekt mit leeren Funktionen. Vergisst jemand den Provider, passiert beim Klick einfach nichts – ohne Fehlermeldung.

Lektion: **Context ist kein Store für alles** (`react-context-state`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Typisiere den Context in `src/cart.tsx` als `CartContextValue | null` und starte ihn mit `null` statt mit einem Default-Objekt.
2. Exportiere `CartContext` nicht mehr. Schreib stattdessen einen Custom Hook `useCart()`, der den Context mit `use` liest und einen Error wirft, wenn kein Provider da ist: „useCart muss innerhalb von <CartProvider> aufgerufen werden“.
3. Stell `CartBadge` und `ProductList` auf `useCart()` um.
4. Nutze die React-19-Schreibweise `<CartContext value={…}>` statt `<CartContext.Provider>`.
5. Entferne `.skip` in `src/cart.test.tsx`.

Zum Nachdenken: Der Warenkorb ändert sich selten und wird an mehreren Stellen gebraucht – ein guter Fall für Context. Der Suchtext eines einzelnen Formulars wäre es nicht. Server-Daten lädst du dort, wo sie gebraucht werden (siehe `examples/data-fetching`).

## Lösung

`solution/cart.tsx` mit `CartProvider` und `useCart`, dazu die umgestellten Components und Tests.
