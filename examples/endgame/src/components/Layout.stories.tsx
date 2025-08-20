import type { Meta, StoryObj } from "@storybook/react-vite";

import Layout from "./Layout";
import { useState } from "react";

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  render: (args: any) => {
    const [username, setUsername] = useState(args.loggedInUser);
    return (
      <Layout loggedInUser={username} setLoggedInUser={() => setUsername("")}>
        {username && <div>logged in</div>}

        {!username && (
          <button onClick={() => setUsername(args.loggedInUser)}>Login</button>
        )}
      </Layout>
    );
  },
  args: {
    loggedInUser: "Max Mustermann",
    setLoggedInUser(user) {},
  },
};

export const LoggedOut: Story = {
  render: (args) => <Layout {...args} />,
  args: {
    loggedInUser: null,
    setLoggedInUser: (user) => alert(user),
  },
};
