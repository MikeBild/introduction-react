import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingButton from "./LoadingButton";

const meta = {
  component: LoadingButton,
} satisfies Meta<typeof LoadingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "black",
  },
};

export const Blue: Story = {
  args: {
    color: "Blue",
  },
};
