import { useContext } from "react";
import { MoodReportBarChart } from "../organisms/MoodReportBarChart";
import { PageContext } from "../templates/MoodboxLayoutTemplate";

interface ReportPageProps {
  labels?: string[];
  dataPoints?: number[];
  onDone?: () => void;
}

export function ReportPage(props: ReportPageProps) {
  const pageContext = useContext(PageContext);

  return (
    <>
      <h2>{pageContext.name}</h2>
      <MoodReportBarChart
        labels={props.labels || []}
        dataPoints={props.dataPoints || []}
      />
      <button onClick={() => props.onDone && props.onDone()}>Close</button>
    </>
  );
}
