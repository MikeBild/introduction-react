import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const RouteError = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Unerwarteter Fehler';
  return (
    <section role="alert">
      <h1>{message}</h1>
      <Link to="/orders">Zur Bestellübersicht</Link>
    </section>
  );
};
