import { lazy, Suspense, useState } from 'react';
import { env } from './env';

const ReportsPage = lazy(() => import('./ReportsPage'));

export const App = () => {
  const [isReportsVisible, setIsReportsVisible] = useState(false);
  return (
    <main>
      <h1>Dashboard</h1>
      <p>
        Release {env.VITE_RELEASE}, API {env.VITE_API_URL}
      </p>
      <button type="button" onClick={() => setIsReportsVisible(true)}>
        Show reports
      </button>
      {isReportsVisible && (
        <Suspense fallback={<p>Loading reports …</p>}>
          <ReportsPage />
        </Suspense>
      )}
    </main>
  );
};
