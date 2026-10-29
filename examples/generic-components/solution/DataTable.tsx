import type { ReactNode } from 'react';

// Eine Spalte zeigt entweder ein Feld von T direkt oder rendert selbst.
export type Column<T> =
  | { field: keyof T & string; header: string }
  | { id: string; header: string; render: (row: T) => ReactNode };

type DataTableProps<T> = {
  rows: readonly T[];
  columns: readonly Column<T>[];
  getRowKey: (row: T) => string;
};

const columnKey = <T,>(column: Column<T>) =>
  'field' in column ? column.field : column.id;

const renderCell = <T,>(column: Column<T>, row: T): ReactNode =>
  'field' in column ? String(row[column.field]) : column.render(row);

export const DataTable = <T,>({
  rows,
  columns,
  getRowKey,
}: DataTableProps<T>) => (
  <table>
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={columnKey(column)}>{column.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={getRowKey(row)}>
          {columns.map((column) => (
            <td key={columnKey(column)}>{renderCell(column, row)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
