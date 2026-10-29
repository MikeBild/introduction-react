# JSX, Listen und Bedingungen

JSX ist JavaScript. Jeder Ausdruck in `{}` ist ein normaler JavaScript-Ausdruck, jede Liste ein `map`, jede Bedingung ein `&&`, ein Ternary oder ein früher `return`.

```tsx
type Order = { id: string; number: string; total: number };

export const OrderList = ({ orders }: { orders: readonly Order[] }) => {
  if (orders.length === 0) return <p>Noch keine Bestellungen.</p>;
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.number}: {order.total} €
        </li>
      ))}
    </ul>
  );
};
```

## Regeln

- Nimm als `key` eine stabile ID aus den Daten, nie den Index. Der Key ist die Identität eines Eintrags, nicht seine Position.
- Gib jedem Zustand eine eigene Ansicht: Loading, Error, Empty und Erfolg.
- Schreib `{count > 0 && …}` statt `{count && …}`, sonst rendert React eine `0`.
- Verschachtelte Ternaries lagerst du in eine eigene Component oder einen frühen `return` aus.

## Übung

Lektion **Keys sind Identität, nicht Position** (`react-lists-conditions`): [examples/lists-conditions](examples/lists-conditions/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/3-jsx.md](legacy/chapters/3-jsx.md).
