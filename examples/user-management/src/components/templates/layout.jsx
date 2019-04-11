import React from 'react';

export const Layout = ({ title = 'Change please!', children }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer />
    </>
  );
};

export default Layout;
