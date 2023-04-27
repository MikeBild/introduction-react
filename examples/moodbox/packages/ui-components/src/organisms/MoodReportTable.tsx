export interface MoodReportTableProps {
  data: TableData[];
}

export interface TableData {
  day: Date;
  team: string;
}

export function MoodReportTable(props: MoodReportTableProps) {
  console.log(props);
  
  const tableHeader = Object.keys(props.data[0]).map((key) => (
    <th key={key}>{key}</th>
  ));

  const tableRows = Object.keys(props.data).map((key, index) => (
    <tr key={key}>
      <td>{props.data[index].toString()}</td>
    </tr>
  ));

  return (
    <table>
      <tr>{tableHeader}</tr>
      {tableRows}
    </table>
  );
}
