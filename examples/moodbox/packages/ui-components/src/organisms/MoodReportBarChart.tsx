import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options:ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
interface MoodReportBarChartProps {
    dataPoints: number[];
    labels: string[];
}

export function MoodReportBarChart(props: MoodReportBarChartProps) {
    const labels =props.labels;
     const data:ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: props.dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}