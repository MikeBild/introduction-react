import { PropsWithChildren, createContext, useState } from "react";
interface MoodboxLayoutTemplateProps {
  renderHeader?: () => JSX.Element;
  renderFooter?: () => JSX.Element;
}

interface PageContext {
  page: string;
  setPage: (newPage: string) => void;
  name?: string;
  setName: (newName: string) => void;
  team?: string;
  setTeam: (newTeam: string) => void;
  moodValue?: number;
  setMoodValue: (newValue: number) => void;
}

let ctx: PageContext = {
  page: "LoginPage",
  setPage: () => {},
  name: "",
  setName: () => {},
  team: "",
  setTeam: () => {},
  moodValue: 0,
  setMoodValue: () => {},
};

export const PageContext = createContext(ctx);

export function MoodboxLayoutTemplate(
  props: PropsWithChildren<MoodboxLayoutTemplateProps>
) {
  const [page, setPage] = useState("LoginPage");
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [moodValue, setMoodValue] = useState(0);

  ctx = {
    ...ctx,
    page,
    setPage,
    name,
    setName,
    team,
    setTeam,
    moodValue,
    setMoodValue,
  };

  return (
    <PageContext.Provider value={ctx}>
      <div>
        {props.renderHeader && <header>{props.renderHeader()}</header>}
        <main>{props.children}</main>
        {props.renderFooter && <footer>{props.renderFooter()}</footer>}
      </div>
    </PageContext.Provider>
  );
}
