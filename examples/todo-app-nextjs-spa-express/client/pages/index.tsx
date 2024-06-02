import Layout from "../components/Layout";
import styles from "../styles/layout.module.css";
import Link from "next/link";
import { useUserContext } from "../components/UserProvider";
import { Tasklist } from "../components/Tasklist";
import { useEffect, useState } from "react";

export default function Index() {
  const [user] = useUserContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    if (!user.username) return;

    const result = await fetch(`http://localhost:8080/todos/${user.username}`);
    const data = await result.json();

    setTasks(
      Object.keys(data).map((x) => ({
        id: x,
        description: x,
        state: data[x],
      }))
    );
  }

  async function updateTask(task: { description: string; state: string }) {
    if (!user.username) return;

    await fetch(`http://localhost:8080/todos/${user.username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    await loadTasks();
  }

  return (
    <Layout>
      <div>
        <div>
          {!user.username && (
            <Link className={styles.mainmenu} href="/login">
              Login
            </Link>
          )}
          {user.username && (
            <Link className={styles.mainmenu} href="/profile">
              Hello {user.username}!
            </Link>
          )}
        </div>
        <div>
          <h1>ToDos</h1>
        </div>
      </div>

      <ul>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <Tasklist<{ description: string; id: string; state: string }>
        items={tasks}
        onAddClick={async (x) => {
          setTasks([
            ...tasks,
            { id: x.id, description: x.text, state: "open" },
          ]);
          updateTask({ description: x.text, state: "open" });
        }}
        onReloadClick={loadTasks}
        renderItem={(x) => (
          <>
            <input
              type="checkbox"
              checked={x.state === "open" ? false : true}
              onChange={(evt) => {
                updateTask({
                  description: x.description,
                  state: evt.target.checked ? "closed" : "open",
                });
              }}
            />
            {x.description}
          </>
        )}
      />
    </Layout>
  );
}
