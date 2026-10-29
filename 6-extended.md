# Children, Composition und Context

## Composition

Gib Inhalte als `children` oder als benannte Slots hinein, statt Flags zu sammeln. Eine `Card` mit `header`, `children` und `actions` ersetzt zehn Props wie `showActions` oder `isCompact`.

Übung dazu: [examples/component-library](examples/component-library/README.md) (Lektion `react-composition`)

## Context

Context transportiert Werte durch den Baum, ohne Props durch jede Ebene zu reichen. Er ist kein Store für alles: Jeder Wechsel des Werts rendert alle Consumer neu.

```tsx
type CartContextValue = { items: readonly CartItem[]; addItem: (item: CartItem) => void };

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const addItem = (item: CartItem) => setItems((current) => [...current, item]);
  return <CartContext value={{ items, addItem }}>{children}</CartContext>;
};

export const useCart = () => {
  const cart = use(CartContext);
  if (!cart) throw new Error('useCart braucht einen CartProvider');
  return cart;
};
```

## Regeln

- Starte mit `null` statt mit einem Default-Objekt voller No-op-Funktionen.
- Biete einen Custom Hook an, der außerhalb des Providers mit klarer Meldung abbricht.
- Leg in Context nur Werte, die selten wechseln und viele brauchen: Theme, Session, Locale.
- Server State gehört in einen Cache wie TanStack Query, nicht in Context.

Higher-Order Components und Render Props findest du nur noch in Legacy-Code. Für geteiltes Verhalten schreibst du heute Custom Hooks.

## Übung

Lektion **Context ist kein Store für alles** (`react-context-state`): [examples/context-state](examples/context-state/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/6-extended.md](legacy/chapters/6-extended.md).
