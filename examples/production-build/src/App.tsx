import { lazy, Suspense, useState } from 'react';
import { env } from './env';

const ReportsPage = lazy(() => import('./ReportsPage'));

export const App = () => {
  const [isReportsVisible, setIsReportsVisible] = useState(false);
  return (
    <main>
      <h1>Werkstatt-Shop · Dashboard</h1>
      <p>
        Release {env.VITE_RELEASE}, API {env.VITE_API_URL}
      </p>
      <button type="button" onClick={() => setIsReportsVisible(true)}>
        Reports anzeigen
      </button>
      {isReportsVisible && (
        <Suspense fallback={<p>Reports werden geladen …</p>}>
          <ReportsPage />
        </Suspense>
      )}
    </main>
  );
};
