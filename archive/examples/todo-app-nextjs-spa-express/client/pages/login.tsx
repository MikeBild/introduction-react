import Layout from "../components/Layout";
import styles from "../styles/layout.module.css";
import { useUserContext } from "../components/UserProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../components/Loading";

export default function Login() {
  const router = useRouter();
  const [_, setUser] = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    setIsLoading(true);
    setHasError(false);
    const result = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    setIsLoading(false);

    if (result.status != 200) {
      setHasError(true);
      return;
    }

    const data = await result.json();
    setUser(data);
    router.push("/");
  }

  return (
    <Layout>
      <Link className={styles.mainmenu} href="/">
        Back
      </Link>
      <h1>Login</h1>
      <div>
        <label>username </label>
        <input onChange={(evt) => setUsername(evt.target.value)} />
      </div>
      <div>
        <label>password </label>
        <input
          type="password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <div>
        <Loading
          isLoading={isLoading}
          hasError={hasError}
          renderErrorMessage={<div>Can not login! Retry please.</div>}
        >
          <button onClick={login}>Login</button>
        </Loading>
      </div>
    </Layout>
  );
}
