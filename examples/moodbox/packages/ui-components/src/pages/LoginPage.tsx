import { useState } from "react";
import { InputField } from "../molecules/InputField";

interface LoginPageProps {
  onLoginButtonClick: (name?: string, team?: string) => void;
}

export function LoginPage(props: LoginPageProps) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  return (
    <>
      <InputField label="Name" initialValue={name} onValueChange={setName} />
      <InputField
        label="Team"
        initialValue="Die Marvels"
        onValueChange={setTeam}
      />
      <button onClick={() => props.onLoginButtonClick(name, team)}>
        Login
      </button>
    </>
  );
}
