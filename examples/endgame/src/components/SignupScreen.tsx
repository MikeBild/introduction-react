import { useState } from "react";

interface LoginSignupScreenProps {
  onRegisterSubmit?: (username: string) => void | string;
}

export default function LoginSignupScreen({
  onRegisterSubmit = () => undefined,
}: LoginSignupScreenProps) {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #e6f9ec 0%, #c1eac5 100%)",
        padding: "32px 40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(60, 120, 60, 0.08)",
        minWidth: "320px",
      }}
    >
      <h2 style={{ color: "#2e7d32", marginBottom: "16px" }}>
        Signup
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          margin: "8px 0",
          padding: "10px",
          border: "1.5px solid #81c784",
          borderRadius: "8px",
          outline: "none",
          width: "100%",
        }}
      />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            margin: "8px 0",
            padding: "10px",
            border: "1.5px solid #81c784",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
          }}
        />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (username !== "") {
            onRegisterSubmit(username);
            alert("Welcome to Endgame!\nThou have been authenticated.\nThou may now procced.")
          } else {
            alert("Please enter a username.");
          }
        }}
        type="submit"
        style={{
          background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 24px",
          marginTop: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 2px 8px rgba(67, 160, 71, 0.12)",
        }}
      >
        Submit
      </button>
      <button
        type="button"
       onClick={() => console.log("To LOGIN!")} // navigate to login screen
        style={{
          marginTop: "12px",
          background: "none",
          color: "#388e3c",
          border: "1px solid #43a047",
          borderRadius: "8px",
          padding: "10px 24px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        I have an account
      </button>
    </form>
  );
}
