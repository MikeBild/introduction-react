import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from '../src/pages/About';
import { Home } from '../src/pages/Home';
import { Layout } from './pages/Layout';
import { NoMatch } from './pages/NoMatch';
import { ResourceDetail } from './pages/ResourceDetail';
import { Resources } from './pages/Resources';

// Die Routes ohne Router – Tests setzen sie in einen MemoryRouter.
export const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="resources" element={<Resources />} />
      <Route path="resources/:resourceId" element={<ResourceDetail />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

export const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
