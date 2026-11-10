*English · [Deutsch](react-typescript.de.md)*

# React with TypeScript

Props are the contract of a component. TypeScript checks it on every call.

## Typing props

```tsx
type CartItemCardProps = {
  name: string;
  quantity: number;
  variant?: 'default' | 'compact' | 'highlighted';
  note?: string;
};

export const CartItemCard = ({ name, quantity, variant = 'default', note }: CartItemCardProps) => …
```

- Describe props with a `type`. Optional props get a default in the destructuring.
- Use union types for variants instead of `string` or several booleans.
- Take over native props with `ComponentProps<'button'>` instead of listing them one by one.
- You no longer need `React.FC`, `defaultProps`, or `PropTypes`.

Exercise: lesson **JSX is JavaScript, props are the contract** (`react-jsx-props`) – [examples/jsx-props](examples/jsx-props/README.md)

## Generic components

A generic component preserves the caller’s type. The columns of a `DataTable<T>` then know the fields of `T`.

```tsx
type Column<T> = { header: string; render: (row: T) => ReactNode };

type DataTableProps<T> = {
  rows: readonly T[];
  columns: readonly Column<T>[];
  getRowKey: (row: T) => string;
};

export const DataTable = <T,>({ rows, columns, getRowKey }: DataTableProps<T>) => …
```

- No `any`, no casts. If you have to cast, a type parameter is missing.
- Let TypeScript infer `T` from `rows` instead of specifying it at the call site.

Exercise: lesson **Generics preserve the caller’s type** (`react-generic-components`) – [examples/generic-components](examples/generic-components/README.md)

The earlier version of this chapter is in [archive/chapters/react-typescript.md](archive/chapters/react-typescript.md).
