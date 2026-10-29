import { Link, useSearchParams } from 'react-router';
import { searchResources } from '../../src/resources';

export const Resources = () => {
  // Die URL ist die einzige Quelle für den Suchtext – kein paralleler useState.
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('q') ?? '';
  const visibleResources = searchResources(searchText);

  return (
    <>
      <h1>Ressourcen</h1>
      <label htmlFor="search">Suche</label>
      <input
        id="search"
        type="search"
        value={searchText}
        onChange={(event) =>
          setSearchParams(event.target.value ? { q: event.target.value } : {}, {
            replace: true,
          })
        }
      />
      <ul>
        {visibleResources.map((resource) => (
          <li key={resource.id}>
            <Link to={`/resources/${resource.id}`}>{resource.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
