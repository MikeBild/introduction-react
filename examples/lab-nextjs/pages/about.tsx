import Link from "next/link";
import { Button } from "../components/Button";

export default function About() {
  return (
    <>
      <h1>About us!</h1>
      <Button buttonText="Hello LAB!" onAction={confirmMe} />
      <Link href="/">Home</Link>
    </>
  );
}

function confirmMe() {
  confirm("Please confirm!");
}
