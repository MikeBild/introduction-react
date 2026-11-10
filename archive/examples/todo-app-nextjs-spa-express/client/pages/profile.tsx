import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/layout.module.css";
import Link from "next/link";
import { useUserContext } from "../components/UserProvider";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useUserContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    isLoading: true,
  });

  useEffect(() => {
    load();
  }, []);

  async function updateProfile() {
    const result = await fetch(
      `http://localhost:8080/profiles/${user.username}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
      }
    );
    const data = await result.json();
    setProfile({ ...data, isLoading: false });
  }

  async function load() {
    const result = await fetch(
      `http://localhost:8080/profiles/${user.username}`
    );
    const data = await result.json();
    setProfile({ ...data, isLoading: false });
  }

  return (
    <Layout>
      <Link className={styles.mainmenu} href="/">
        Back
      </Link>

      <h1>My Profile</h1>
      <ul>
        <li>
          {user.username && (
            <button
              className="button"
              onClick={() => {
                setUser({ username: "", token: "" });
                router.push("/");
              }}
            >
              Logout {user.username}
            </button>
          )}
        </li>
        <li>
          <button className="button" onClick={load}>
            Reload
          </button>
        </li>
      </ul>

      <div>
        <label>firstname </label>
        <input
          onChange={(evt) => setFirstName(evt.target.value)}
          defaultValue={profile.firstName}
        />
      </div>
      <div>
        <label>lastname </label>
        <input
          onChange={(evt) => setLastName(evt.target.value)}
          defaultValue={profile.lastName}
        />
      </div>
      <div>
        <button onClick={updateProfile}>Update</button>
      </div>
    </Layout>
  );
}
