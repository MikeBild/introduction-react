import { MoodPage } from "@moodbox/ui-components";

export default {
  title: "Moodbox/Pages/MoodPage",
  component: MoodPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => <MoodPage />,
};
