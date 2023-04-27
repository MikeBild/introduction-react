import { useContext } from "react";
import { MoodboxLayoutTemplate, PageContext } from "@moodbox/ui-components";

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
      <Demo />
    </MoodboxLayoutTemplate>
  ),
};

function Demo() {
  const pageContext = useContext(PageContext);
  console.log(pageContext);
  return <>
  <button onClick={() => pageContext.setPage('DemoPage')}>Click here</button>
  <h1>{pageContext.page}</h1></>;
}
