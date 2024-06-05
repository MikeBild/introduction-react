import { Header } from "../components/organisms/Header";
import { MenuList } from "../components/organisms/MenuList";
import { Layout } from "../components/templates/Layout";
import { useDelay } from "../lib/useDelay";
import { useFetch } from "../lib/useFetch";

export default function About() {
  const data = useDelay(5000);
  const tData = useFetch();


  return (
    <Layout>
      <h1>About</h1>
      <hr />
      <div>{JSON.stringify(data, null, 4)}</div>
      <div>{JSON.stringify(tData, null, 4)}</div>
    </Layout>
  );
}
