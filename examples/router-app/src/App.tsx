import { useState } from 'react';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { ResourceDetail } from './pages/ResourceDetail';
import { Resources } from './pages/Resources';

export type Page =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'resources' }
  | { name: 'resource'; resourceId: number };

// Übung react-routing: Die aktuelle Seite lebt nur in useState.
// Reload, Back-Button und geteilte Links verlieren deshalb die Ansicht.
export const App = () => {
  const [page, setPage] = useState<Page>({ name: 'home' });
  const goHome = () => setPage({ name: 'home' });

  return (
    <Layout onNavigate={setPage}>
      {page.name === 'home' && <Home />}
      {page.name === 'about' && <About />}
      {page.name === 'resources' && (
        <Resources
          onSelectResource={(resourceId) =>
            setPage({ name: 'resource', resourceId })
          }
        />
      )}
      {page.name === 'resource' && (
        <ResourceDetail
          resourceId={page.resourceId}
          onBack={() => setPage({ name: 'resources' })}
          onBackToHome={goHome}
        />
      )}
    </Layout>
  );
};
