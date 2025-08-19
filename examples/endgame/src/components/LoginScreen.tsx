import { useState } from "react";

interface LoginSignupScreenProps {
  onLoginSubmit?: (username: string) => string | void;
}

export default function LoginSignupScreen({
  onLoginSubmit = () => undefined,
}: LoginSignupScreenProps) {
  const [username, setUsername] = useState("");
  const [isLoginScreen, setIsLoginScreen] = useState(true);

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
        {isLoginScreen ? "Login" : "Register"}
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

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (username !== "") {
            onLoginSubmit(username);
            // alert("Welcome to Endgame!\nThou have been authenticated.\nThou may now procced.")
          } else {
            alert("Please enter a username.");
          }
        }}
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
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.1s ease-in-out",
        }}
        className="explosion-btn"
      >
        <style>{`
          .explosion-btn:active {
        transform: scale(0.95);
          }
          .explosion-btn:active::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: explode 0.5s ease-out;
          }
          @keyframes explode {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
          }
        `}</style>
        Submit
      </button>
      <button
        type="button"
        onClick={() => setIsLoginScreen((prev) => !prev)}
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
        I don't have an account
      </button>
    </form>
  );
}
