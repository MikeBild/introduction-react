import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

const NotFound = () => (
  <>
    <h1>Seite nicht gefunden</h1>
    <Link to="/">Zur Startseite</Link>
  </>
);

const Layout = () => (
  <>
    <header>
      <nav aria-label="Hauptnavigation">
        <Link to="/">Start</Link> | <Link to="/about">Über uns</Link> |{' '}
        <Link to="/resources">Ressourcen</Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>Router App</footer>
  </>
);

export const Route = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
