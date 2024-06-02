import Layout from "../components/Layout";
import styles from "../styles/layout.module.css";
import Link from "next/link";

export default function About() {
  return (
    <Layout>
      <Link className={styles.mainmenu} href="/">
        Back
      </Link>
      <h1>About</h1>
    </Layout>
  );
}
