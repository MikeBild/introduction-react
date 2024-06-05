import { useState } from "react";
import { useUserContext } from "../lib/userProvider";
import { Layout } from "../components/templates/Layout";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userContext, setUser] = useUserContext();

  async function login(username: string, password: string) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  }

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
        onClick={async () => {
          const result = await login(usernameInput, passwordInput);
          setUser(result);
          router.push("/");
        }}
      >
        Login
      </button>
    </Layout>
  );
}
