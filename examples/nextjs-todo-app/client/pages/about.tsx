import { Layout } from "../components/templates/Layout";
import { useDelay } from "../lib/useDelay";
import { useFetch } from "../lib/useFetch";
import styles from "../styles/about.module.css";

export default function About() {
  const data = useDelay(5000);
  const tData = useFetch();

  return (
    <Layout>
      <h1>About</h1>
      <hr />
      <div className={styles.foo}>{JSON.stringify(data, null, 4)}</div>
      <div>{JSON.stringify(tData, null, 4)}</div>
    </Layout>
  );
}
