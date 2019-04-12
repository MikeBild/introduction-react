import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from './PrimaryButton';

export const UserAddPrimaryButton = ({ children }) => {
  return <PrimaryButton to="/user/add">{children}</PrimaryButton>;
};

UserAddPrimaryButton.propTypes = {
  children: PropTypes.node,
};
