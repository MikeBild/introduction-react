import { useState } from "react";

interface LoginSignupScreenProps {
    onLoginSubmit?: () => void;
    onRegisterSubmit?: () => void;
}

export default function LoginSignupScreen({onLoginSubmit = () => null, onRegisterSubmit = () => null}: LoginSignupScreenProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [isLogginScreen, setIsLogginScreen] = useState(true);
    console.log("is login screen", isLogginScreen)
  
    return (
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>{isLogginScreen ? "Login" : "Register"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ margin: "8px 0" }}
        />
        { isLogginScreen === false ? <div style={{display: "contents"}}>
            <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ margin: "8px 0" }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ margin: "8px 0" }}
        />
        </div>
    : null
        }
        
        <button onClick={e => {
          e.preventDefault();
            if (isLogginScreen) {
                onLoginSubmit();
            } else {
                onRegisterSubmit();
            }
        }}
        type="submit">Submit</button>
        <button onClick={e => {e.preventDefault(); setIsLogginScreen(!isLogginScreen);}}>{isLogginScreen ? "I dont have an Acccount" : "I have an Account"}</button>
      </form>
    );
  }