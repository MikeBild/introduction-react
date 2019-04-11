import React from 'react';

export const Layout = ({ title = 'Change please!' }) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main />
      <footer />
    </>
  );
};

export default Layout;
