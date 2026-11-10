import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { errorText, httpErrorText } from '../src/errorText';

export const RouteError = () => {
  const error = useRouteError();
  // A readable sentence with a next step instead of “404 Not Found”
  const message = isRouteErrorResponse(error)
    ? httpErrorText(error.status)
    : errorText(error);
  return (
    <section role="alert">
      <h1>{message}</h1>
      <Link to="/orders">Zur Bestellübersicht</Link>
    </section>
  );
};
