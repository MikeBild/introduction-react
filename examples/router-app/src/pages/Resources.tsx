import { useState } from 'react';
import { Link } from 'react-router';
import { searchResources } from '../resources';

export const Resources = () => {
  // Übung: Der Suchtext gehört in die URL (?q=…), nicht in useState.
  // Sonst geht er beim Reload, beim Teilen des Links und mit dem Back-Button verloren.
  const [searchText, setSearchText] = useState('');
  const visibleResources = searchResources(searchText);

  return (
    <>
      <h1>Ressourcen</h1>
      <label htmlFor="search">Suche</label>
      <input
        id="search"
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
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
