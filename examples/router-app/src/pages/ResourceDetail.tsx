import { findResourceById } from '../resources';
import { NoMatch } from './NoMatch';

type ResourceDetailProps = {
  resourceId: number;
  onBack: () => void;
  onBackToHome: () => void;
};

export const ResourceDetail = ({
  resourceId,
  onBack,
  onBackToHome,
}: ResourceDetailProps) => {
  const resource = findResourceById(resourceId);
  if (!resource) return <NoMatch onBackToHome={onBackToHome} />;

  return (
    <>
      <h1>{resource.name}</h1>
      <p>Plätze: {resource.capacity}</p>
      <button type="button" onClick={onBack}>
        Zurück zu den Ressourcen
      </button>
    </>
  );
};
