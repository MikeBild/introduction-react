import { ReportPage } from "@moodbox/ui-components";

export default {
  title: "Moodbox/Pages/ReportPage",
  component: ReportPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <ReportPage labels={["Team A", "Team B"]} dataPoints={["22", "44"]} />
  ),
};
