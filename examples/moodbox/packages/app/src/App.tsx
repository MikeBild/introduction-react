import { useState } from "react";
import {
  LoginPage,
  MoodPage,
  ReportPage,
  MoodboxLayoutTemplate,
} from "@moodbox/ui-components";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("LoginPage");
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [moodValue, setMoodValue] = useState(0);

  return (
    <MoodboxLayoutTemplate>
      <h1 data-testid="headline">Moodbox</h1>
      {currentPage === "LoginPage" && (
        <LoginPage
          onLoginButtonClick={(name = "", team = "") => {
            setName(name);
            setTeam(team);
            setCurrentPage("MoodPage");
          }}
        />
      )}
      {currentPage === "MoodPage" && (
        <>
          <MoodPage
            onMoodConfirmed={(moodValue) => {
              setMoodValue(moodValue);
              setCurrentPage("ReportPage");
            }}
          />
          <button
            onClick={() => {
              setCurrentPage("LoginPage");
            }}
          >
            Logout
          </button>
        </>
      )}
      {currentPage === "ReportPage" && (
        <ReportPage
          dataPoints={[moodValue]}
          labels={[team]}
          onDone={() => {
            setCurrentPage("MoodPage");
          }}
        />
      )}
    </MoodboxLayoutTemplate>
  );
}

export default App;
