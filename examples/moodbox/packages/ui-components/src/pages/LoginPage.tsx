import { useState, useContext } from "react";
import { InputField } from "../molecules/InputField";
import { PageContext } from "../templates/MoodboxLayoutTemplate";

interface LoginPageProps {
  onLoginButtonClick: (name?: string, team?: string) => void;
}

export function LoginPage(props: LoginPageProps) {
  const pageContext = useContext(PageContext);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  return (
    <>
      <InputField
        label="Name"
        initialValue={name}
        onValueChange={(name) => {
          setName(name);
          pageContext && pageContext.setName(name);
        }}
      />
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
