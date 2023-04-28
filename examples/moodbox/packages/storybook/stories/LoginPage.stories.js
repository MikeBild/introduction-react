import { LoginPage } from "@moodbox/ui-components";

export default {
  title: "Moodbox/Pages/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => <LoginPage onLoginButtonClick={(name, team) => alert(`${name} ${team}`)}/>,
};
