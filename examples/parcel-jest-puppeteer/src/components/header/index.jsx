import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name = 'World' }) => (
  <header>
    <h1>Hello {name}</h1>
  </header>
);

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
