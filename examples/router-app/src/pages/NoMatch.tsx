type NoMatchProps = { onBackToHome: () => void };

export const NoMatch = ({ onBackToHome }: NoMatchProps) => (
  <>
    <h1>Seite nicht gefunden</h1>
    <button type="button" onClick={onBackToHome}>
      Zur Startseite
    </button>
  </>
);
