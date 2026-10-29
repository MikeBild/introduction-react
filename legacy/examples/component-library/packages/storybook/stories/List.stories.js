import { object } from "@storybook/addon-knobs";
import List from "@introduction-react/list";

const meta = {
  title: "Components/Molecules/List",
  component: List,
};

export default meta;

export const Basic = {
  render: () => <List />,
};

export const WithRows = {
  render: () => (
    <List
      rows={object("rows", [
        { id: 1, value: "A" },
        { id: 2, value: "B" },
      ])}
      renderRow={({ id, value }) => (
        <tr>
          <td>{id}</td>
          <td>{value}</td>
        </tr>
      )}
    />
  ),
};
