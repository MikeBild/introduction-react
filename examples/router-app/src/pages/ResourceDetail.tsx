import { Link, useParams } from 'react-router';
import { findResourceById } from '../resources';
import { NoMatch } from './NoMatch';

export const ResourceDetail = () => {
  // Übung: useParams liefert string | undefined – Umwandlung und Prüfung
  // passieren hier von Hand. Mit TanStack Router übernimmt das die Route.
  const { resourceId } = useParams();
  const resource = findResourceById(Number(resourceId));
  if (!resource) return <NoMatch />;

  return (
    <>
      <h1>{resource.name}</h1>
      <p>Plätze: {resource.capacity}</p>
      <Link to="/resources">Zurück zu den Ressourcen</Link>
    </>
  );
};
