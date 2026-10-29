import React from "react";

export interface Row {
  id: string;
  value?: string;
}

interface TProps {
  rows: [Row];
  renderRow: (item: Row) => JSX.Element;
}

export const List: React.FunctionComponent<TProps> = ({
  rows = [],
  renderRow = (itm: any) => {
    return <tr />;
  },
}) => {
  return (
    <table>
      <tbody>{rows.map(renderRow)}</tbody>
    </table>
  );
};

export default List;
