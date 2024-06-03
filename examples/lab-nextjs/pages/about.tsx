import Link from "next/link";
import { LoadingButton } from "../components/LoadingButton";
import { useState } from "react";
import { Layout } from "../components/Layout";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout renderFooter={<h1>Footer About Page</h1>}>
      <h1>About us!</h1>
      <LoadingButton
        isLoading={isLoading}
        buttonText="Hello LAB!"
        onAction={async () => {
          setIsLoading(true);
          await load();
          setIsLoading(false);
        }}
      />
    </Layout>
  );
}

async function load(): Promise<void> {
  await delay(5000);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timeoutRef = setTimeout(() => {
      clearTimeout(timeoutRef);
      resolve();
    }, ms);
  });
}
