import { MoodReportBarChart } from "../organisms/MoodReportBarChart";

interface ReportPageProps {
  labels?: string[];
  dataPoints?: number[];
  onDone: () => void;
}

export function ReportPage(props: ReportPageProps) {
  return (
    <>
      <MoodReportBarChart
        labels={(props.labels || [])}
        dataPoints={props.dataPoints || []}
      />
      <button onClick={props.onDone}>Close</button>
    </>
  );
}
