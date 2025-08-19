import "./App.css";
import { useState } from "react";
import SignupScreen from "./components/SignupScreen";

export default function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <>
  {/* if(!isLoggedIn) { */}
  <SignupScreen onRegisterSubmit={register}></SignupScreen>
  {/* } */}
  </>;
}

const register = () => {
  console.log("register");
  alert(<section>
    <h1>Welcome to Endgame!</h1>
    <p>Thou have been authenticated.</p>
    <p>Thou may now procced.</p>
</section>)
}

const login = () => {
  console.log("login");
}
