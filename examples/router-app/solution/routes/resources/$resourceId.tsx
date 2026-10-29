import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { z } from 'zod';
import { findResourceById } from '../../../src/resources';

const ResourceIdSchema = z.coerce.number().int().positive();

const ResourceDetail = () => {
  // resource ist hier nie undefined – der Loader hat das schon geprüft.
  const resource = Route.useLoaderData();
  return (
    <>
      <h1>{resource.name}</h1>
      <p>Plätze: {resource.capacity}</p>
      <Link to="/resources">Zurück zu den Ressourcen</Link>
    </>
  );
};

export const Route = createFileRoute('/resources/$resourceId')({
  // Aus dem string in der URL wird ein geprüfter number-Param.
  params: {
    parse: ({ resourceId }) => {
      const parseResult = ResourceIdSchema.safeParse(resourceId);
      if (!parseResult.success) throw notFound();
      return { resourceId: parseResult.data };
    },
    stringify: ({ resourceId }) => ({ resourceId: String(resourceId) }),
  },
  loader: ({ params }) => {
    const resource = findResourceById(params.resourceId);
    if (!resource) throw notFound();
    return resource;
  },
  component: ResourceDetail,
});
