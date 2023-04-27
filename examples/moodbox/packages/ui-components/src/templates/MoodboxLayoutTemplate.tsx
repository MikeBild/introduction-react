import { PropsWithChildren, createContext, useState } from "react";
interface MoodboxLayoutTemplateProps {
  renderHeader?: () => JSX.Element;
  renderFooter?: () => JSX.Element;
}

interface PageContext {
  page: string;
  setPage: (newPage: string) => void;
}
let ctx: PageContext = { page: "LoginPage", setPage: () => {} };

export const PageContext = createContext(ctx);

export function MoodboxLayoutTemplate(
  props: PropsWithChildren<MoodboxLayoutTemplateProps>
) {
  const [page, setPage] = useState("LoginPage");
  ctx = {
    ...ctx,
    page,
    setPage,
  };

  return (
    <PageContext.Provider value={ctx}>
      <div>
        {props.renderHeader && <header>{props.renderHeader()}</header>}
        <main style={{ display: "flex", justifyContent: "center" }}>
          {props.children}
        </main>
        {props.renderFooter && <footer>{props.renderFooter()}</footer>}
      </div>
    </PageContext.Provider>
  );
}
