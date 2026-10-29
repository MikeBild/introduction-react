import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { searchResources } from '../../../src/resources';

// Der Suchtext lebt in der URL: Reload, geteilter Link und Back-Button behalten ihn.
const ResourcesSearchSchema = z.object({
  q: z.string().default(''),
});

const Resources = () => {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const visibleResources = searchResources(q);

  return (
    <>
      <h1>Ressourcen</h1>
      <label htmlFor="search">Suche</label>
      <input
        id="search"
        type="search"
        value={q}
        onChange={(event) =>
          navigate({ search: { q: event.target.value }, replace: true })
        }
      />
      <ul>
        {visibleResources.map((resource) => (
          <li key={resource.id}>
            <Link
              to="/resources/$resourceId"
              params={{ resourceId: resource.id }}
            >
              {resource.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Route = createFileRoute('/resources/')({
  validateSearch: ResourcesSearchSchema,
  component: Resources,
});
