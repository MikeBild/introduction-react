import { Link } from 'react-router-dom';
import React from 'react';

export const Layout = ({ title = 'Change please!', children }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer />
    </>
  );
};

export default Layout;
