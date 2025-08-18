import {MoodReportBarChart} from "@moodbox/ui-components";

export default {
    title: "Moodbox/MoodReportBarChart",
    component: MoodReportBarChart,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export const Default = {
    args: {
        labels: ["Team 1", "Team 2"],
        dataPoints: [20, 40]
    },
};
