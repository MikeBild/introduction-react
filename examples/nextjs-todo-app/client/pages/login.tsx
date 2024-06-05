import { useState } from "react";
import { useUserContext } from "../lib/userProvider";
import { Layout } from "../components/templates/Layout";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userContext, setUser] = useUserContext();

  return (
    <Layout>
      <h1>Login</h1>
      <input
        type="text"
        onChange={(evt) => setUsernameInput(evt.target.value)}
      />
      <input
        type="password"
        onChange={(evt) => setPasswordInput(evt.target.value)}
      />
      <button
        onClick={() => {
          setUser({ username: usernameInput });
        }}
      >
        Login
      </button>
    </Layout>
  );
}
