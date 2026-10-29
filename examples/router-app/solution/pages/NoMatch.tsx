import { Link } from 'react-router';

export const NoMatch = () => (
  <>
    <h1>Seite nicht gefunden</h1>
    <Link to="/">Zur Startseite</Link>
  </>
);
