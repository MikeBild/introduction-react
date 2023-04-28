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
  const [moodReport, setMoodReport] = useState({});

  async function loadReport() {
    const response = await fetch("http://localhost:8080/report");
    const data = await response.json();
    setMoodReport(data);
  }

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
            onMoodConfirmed={async (moodValue) => {
              await fetch("http://localhost:8080/moods", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  name: `${name}-${team}`,
                  value: moodValue,
                }),
              });
              setMoodValue(moodValue);
              await loadReport();
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
          dataPoints={Object.values(moodReport)}
          labels={Object.keys(moodReport)}
          onDone={() => {
            setCurrentPage("MoodPage");
          }}
        />
      )}
    </MoodboxLayoutTemplate>
  );
}

export default App;
