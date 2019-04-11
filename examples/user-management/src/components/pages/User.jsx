import React from 'react';
import { Layout } from '../templates/Layout';
import users from '../../users.json';

export const User = ({
  match: {
    params: { id: currentUserId = 'anonymous' },
  },
}) => {
  const { name = 'anonymous' } = users.find(({ id }) => id === currentUserId);

  return (
    <Layout title="User">
      <p>User Content for ID {currentUserId}</p>
      <hr />
      <label>{name}</label>
    </Layout>
  );
};

export default User;
