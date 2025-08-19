import "./App.css";
import { useState } from "react";
import LoginSignupScreen from "./components/LoginSignupScreen";

export default function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <>
  {/* if(!isLoggedIn) { */}
  <LoginSignupScreen onRegisterSubmit={register} onLoginSubmit={login}></LoginSignupScreen>
  {/* } */}
  </>;
}

const register = () => {
  console.log("register");
}

const login = () => {
  console.log("login");
}
