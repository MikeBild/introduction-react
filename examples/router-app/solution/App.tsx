import { useState } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { routes } from './routes';

export const App = () => {
  // Create it once per app. A module-level router in main.tsx would work too.
  const [router] = useState(() => createBrowserRouter(routes));
  return <RouterProvider router={router} />;
};
