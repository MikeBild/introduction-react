import { Link, useParams } from 'react-router';
import { findResourceById } from '../../src/resources';
import { parseResourceId } from '../resourceId';
import { NoMatch } from './NoMatch';

export const ResourceDetail = () => {
  const resourceId = parseResourceId(useParams().resourceId);
  const resource =
    resourceId === null ? undefined : findResourceById(resourceId);
  if (!resource) return <NoMatch />;

  return (
    <>
      <h1>{resource.name}</h1>
      <p>Plätze: {resource.capacity}</p>
      <Link to="/resources">Zurück zu den Ressourcen</Link>
    </>
  );
};
