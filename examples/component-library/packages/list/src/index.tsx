import * as React from 'react';

export interface Row {
  id: string;
  value?: string;
}

interface TProps {
  rows: [Row];
  renderRow: (item: Row) => JSX.Element;
}

export const List: React.StatelessComponent<TProps> = ({ rows, renderRow }) => {
  return (
    <table>
      <tbody>{rows.map(renderRow)}</tbody>
    </table>
  );
};

export default List;
