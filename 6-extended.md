*English · [Deutsch](6-extended.de.md)*

# Children, composition, and Context

## Composition

Pass content in as `children` or as named slots instead of collecting flags. A `Card` with `header`, `children`, and `actions` replaces ten props like `showActions` or `isCompact`.

Exercise: lesson **Pass content in instead of collecting flags** (`react-composition`) – [examples/component-library](examples/component-library/README.md)

## Context

Context carries values through the tree without passing props through every level. It is not a store for everything: every change of the value re-renders all consumers.

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

## Rules

- Start with `null` instead of a default object full of no-op functions.
- Offer a Custom Hook that fails with a clear message outside the provider.
- Put only values into Context that change rarely and that many components need: theme, session, locale.
- Server data does not belong in Context. Load it where it is needed, with `fetch`, `use`, and `Suspense`.

Higher-Order Components and render props only appear in older code. For shared behavior you write Custom Hooks today.

## Exercise

Lesson **Context is not a store for everything** (`react-context-state`): [examples/context-state](examples/context-state/README.md)

The earlier version of this chapter is in [archive/chapters/6-extended.md](archive/chapters/6-extended.md).
