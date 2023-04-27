import { MoodboxLayoutTemplate } from "@moodbox/ui-components";

export default {
  title: "Moodbox/Templates/Layout",
  component: MoodboxLayoutTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <MoodboxLayoutTemplate
      renderHeader={() => <h1>Header</h1>}
      renderFooter={() => (
        <ul>
          <li>Menu 1</li>
        </ul>
      )}
    >
      <h1>Content</h1>
    </MoodboxLayoutTemplate>
  ),
};
