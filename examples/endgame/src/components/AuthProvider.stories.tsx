import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthProvider, useAuthContext } from "./AuthProvider";
import React from "react";

const meta = {
  component: () => React.createElement("div"),
} satisfies Meta<typeof HTMLElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: (Story) => {
    return (
      <AuthProvider>
        <Story />
      </AuthProvider>
    );
  },
  render: () => {
    const auth = useAuthContext();

    return (
      <>
        <code>{JSON.stringify({ auth }, null, 4)}</code>
        <button
          onClick={() => {
            auth?.login("mike");
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            auth?.logout();
          }}
        >
          Logout
        </button>
      </>
    );
  },
  args: {},
};
