import { PropsWithChildren } from "react";
interface MoodboxLayoutTemplateProps {
  renderHeader?: () => JSX.Element;
  renderFooter?: () => JSX.Element;
}

export function MoodboxLayoutTemplate(
  props: PropsWithChildren<MoodboxLayoutTemplateProps>
) {
  return (
    <div>
      {props.renderHeader && <header>{props.renderHeader()}</header>}
      <main
        style={{
          minHeight: "10em",
          display: "table-cell",
          verticalAlign: "middle",
        }}
      >
        {props.children}
      </main>
      {props.renderFooter && <footer>{props.renderFooter()}</footer>}
    </div>
  );
}
