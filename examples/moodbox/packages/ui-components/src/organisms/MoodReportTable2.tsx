
export interface MoodReportTableProps {
  day:Date,
  team: string
}

export function MoodReportTable(props: MoodReportTableProps[]) {
  const tableHeader = Object.keys(props[0]).map((key) => (
    <th key={key}>
      {key}
    </th>
  ));

  const tableRows = Object.keys(props).map((key, index) => (
    <tr key={key}>
      <td>{props[index].toString()}</td>
    </tr>
  ));

  return (
    <table>
      <tr>
      {tableHeader}
      </tr>
      {tableRows}
    </table>
  );
}