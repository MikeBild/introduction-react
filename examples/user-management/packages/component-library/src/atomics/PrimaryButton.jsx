import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export const PrimaryButton = ({ to = '/', children }) => {
  return <a href={to}>{children}</a>;
};

PrimaryButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};
