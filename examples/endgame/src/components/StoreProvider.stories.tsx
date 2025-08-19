import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoreProvider, useStore } from "./StoreProvider";
import React from "react";

const meta = {
  component: () => React.createElement("div"),
} satisfies Meta<typeof HTMLElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => {
    const store = useStore(args.todos);

    return (
      <StoreProvider>
        <code>{JSON.stringify({ store }, null, 4)}</code>
      </StoreProvider>
    );
  },
  args: {
    todos: [{ text: "todo 1" }],
  },
};
