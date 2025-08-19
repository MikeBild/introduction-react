import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useAuthContext } from "./components/AuthProvider";
import LoginSignupScreen from "./components/LoginScreen";

export default function App() {
  const [username, setUsername] = useState("");
  const auth = useAuthContext();
  
  return (
    <Layout
      loggedInUser={auth?.isAuthenticated ? username : null}
      setLoggedInUser={() => setUsername("")}
    >
      {auth?.isAuthenticated && <div>logged in</div>}

      {!auth?.isAuthenticated && (
        <LoginSignupScreen
          onLoginSubmit={(username) => {
            auth?.login(username);
            setUsername(username);
          }}
        />
      )}
    </Layout>
  );
}
