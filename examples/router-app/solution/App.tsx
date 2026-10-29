import { useState } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { routes } from './routes';

export const App = () => {
  // Einmal pro App anlegen. In main.tsx ginge auch ein Router auf Modulebene.
  const [router] = useState(() => createBrowserRouter(routes));
  return <RouterProvider router={router} />;
};
