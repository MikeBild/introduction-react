# React mit TypeScript

Props sind der Vertrag einer Component. TypeScript prüft ihn bei jedem Aufruf.

## Props typisieren

```tsx
type CartItemCardProps = {
  name: string;
  quantity: number;
  variant?: 'default' | 'compact' | 'highlighted';
  note?: string;
};

export const CartItemCard = ({ name, quantity, variant = 'default', note }: CartItemCardProps) => …
```

- Beschreib Props mit einem `type`. Optionale Props bekommen einen Default in der Destrukturierung.
- Nimm Union Types für Varianten statt `string` oder mehrerer Booleans.
- Übernimm native Props mit `ComponentProps<'button'>`, statt sie einzeln aufzuzählen.
- `React.FC`, `defaultProps` und `PropTypes` brauchst du nicht mehr.

Übung: Lektion **JSX ist JavaScript, Props sind der Vertrag** (`react-jsx-props`) – [examples/jsx-props](examples/jsx-props/README.md)

## Generische Components

Eine generische Component bewahrt den Typ des Aufrufers. Die Spalten einer `DataTable<T>` kennen dann die Felder von `T`.

```tsx
type Column<T> = { header: string; render: (row: T) => ReactNode };

type DataTableProps<T> = {
  rows: readonly T[];
  columns: readonly Column<T>[];
  getRowKey: (row: T) => string;
};

export const DataTable = <T,>({ rows, columns, getRowKey }: DataTableProps<T>) => …
```

- Kein `any`, keine Casts. Wenn du casten musst, fehlt ein Type Parameter.
- Lass TypeScript `T` aus `rows` ableiten, statt ihn beim Aufruf anzugeben.

Übung: Lektion **Generics bewahren den Typ des Aufrufers** (`react-generic-components`) – [examples/generic-components](examples/generic-components/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/react-typescript.md](legacy/chapters/react-typescript.md).
