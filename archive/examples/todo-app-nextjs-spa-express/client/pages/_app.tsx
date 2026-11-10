import "../styles/global.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../components/UserProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
