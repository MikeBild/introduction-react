import { NavLink, Outlet } from 'react-router';

export const Layout = () => (
  <>
    <header>
      <nav aria-label="Hauptnavigation">
        <NavLink to="/" end>
          Start
        </NavLink>{' '}
        | <NavLink to="/about">Über uns</NavLink> |{' '}
        <NavLink to="/resources">Ressourcen</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>Router App</footer>
  </>
);
