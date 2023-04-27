/*

interface MoodReportTableDataProps {
  [colName: string]: string | number | Date;
  //isLoading: boolean;
}

interface MoodReportTableHeaderProps {
  [headerName: string]: string;
}

export interface MoodReportTableAll {
  rows: MoodReportTableDataProps;
  header: MoodReportTableHeaderProps;
}

export function MoodReportTable(props: MoodReportTableAll) {
  const tableHeader = Object.keys(props.header).map((key) => (
    <th key={key}>
      <td>{props.header[key]}</td>
    </th>
  ));

  const tableRows = Object.keys(props.rows).map((key) => (
    <tr key={key}>
      <td>{props.rows[key].toString()}</td>
    </tr>
  ));
  return (
    <table>
      {tableHeader}
      {tableRows}
    </table>
  );
}
*/