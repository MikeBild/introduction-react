import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoreProvider, useStore } from "./StoreProvider";

const meta = {} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: (Story, { args }: any) => {
    return (
      <StoreProvider todoList={args.todos}>
        <Story />
      </StoreProvider>
    );
  },
  render: () => {
    const store = useStore();

    return (
      <>
        <code>{JSON.stringify(store?.todoList, null, 4)}</code>
        <button onClick={() => store?.addTodo({ text: "bla" })}>Add</button>
      </>
    );
  },
  args: {
    todos: [{ text: "todo 1" }],
  },
};
