import { NavLink, Outlet, useNavigation } from 'react-router';

export const ShopLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>
            Produkte
          </NavLink>{' '}
          <NavLink to="/orders">Bestellungen</NavLink>{' '}
          <NavLink to="/orders?status=placed">Offene Bestellungen</NavLink>
        </nav>
        {navigation.state === 'loading' && <p role="status">Lädt …</p>}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
