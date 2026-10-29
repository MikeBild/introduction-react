import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { errorText, httpErrorText } from '../src/errorText';

export const RouteError = () => {
  const error = useRouteError();
  // Lesbarer Satz mit nächstem Schritt statt „404 Not Found“
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
