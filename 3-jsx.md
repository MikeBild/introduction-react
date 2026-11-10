*English · [Deutsch](3-jsx.de.md)*

# JSX, lists, and conditions

JSX is JavaScript. Every expression in `{}` is a regular JavaScript expression, every list is a `map`, every condition is an `&&`, a ternary, or an early `return`.

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

## Rules

- Use a stable ID from the data as the `key`, never the index. The key is the identity of an entry, not its position.
- Give each state its own view: loading, error, empty, and success.
- Write `{count > 0 && …}` instead of `{count && …}`, otherwise React renders a `0`.
- Move nested ternaries into their own component or an early `return`.

## Exercise

Lesson **Keys are identity, not position** (`react-lists-conditions`): [examples/lists-conditions](examples/lists-conditions/README.md)

The earlier version of this chapter is in [archive/chapters/3-jsx.md](archive/chapters/3-jsx.md).
