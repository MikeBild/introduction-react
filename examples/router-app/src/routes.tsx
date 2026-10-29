import type { RouteObject } from 'react-router';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { NoMatch } from './pages/NoMatch';
import { ResourceDetail } from './pages/ResourceDetail';
import { Resources } from './pages/Resources';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'resources', Component: Resources },
      { path: 'resources/:resourceId', Component: ResourceDetail },
      { path: '*', Component: NoMatch },
    ],
  },
];
