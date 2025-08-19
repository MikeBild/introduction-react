
interface WelcomeScreenProps {
    
}

export default function WelcomeScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div>
      <h1>Welcome!</h1>
      <button style={{ margin: "0 8px" }} onClick={onRegister}>Register</button>
      <button style={{ margin: "0 8px" }} onClick={onLogin}>Login</button>
    </div>
  );
}