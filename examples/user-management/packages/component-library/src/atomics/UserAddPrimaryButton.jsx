import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from './PrimaryButton';

UserAddPrimaryButton.propTypes = {
  children: PropTypes.node,
};

export function UserAddPrimaryButton({ children }) {
  return <PrimaryButton to="/user/add">{children}</PrimaryButton>;
}
