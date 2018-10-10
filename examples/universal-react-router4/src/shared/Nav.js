import React from 'react';

const style = {
  padding: '24px',
  backgroundColor: '#eee',
  width: '400px',
  height: '100vh',
  overflow: 'scroll',
};

export const NavItem = ({ children }) => <p style={style}>{children}</p>;

export const NavBar = ({ children }) => <aside style={style}>{children}</aside>;
