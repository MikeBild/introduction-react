import { Navigate } from "react-router";
import LoginSignupScreen from "../components/LoginScreen";
import { useAuthContext } from "../components/AuthProvider";

export default function Login() {
  const auth = useAuthContext();  
  if (auth?.isAuthenticated) return <Navigate to="/" />;

  return (
    <LoginSignupScreen
      onLoginSubmit={(username) => {
        auth?.login(username);
      }}
    />
  );
}
