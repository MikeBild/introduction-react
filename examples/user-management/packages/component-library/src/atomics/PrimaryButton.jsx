import React from 'react';
import PropTypes from 'prop-types';

PrimaryButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export function PrimaryButton({ to = '/', children }) {
  return <a href={to}>{children}</a>;
}
