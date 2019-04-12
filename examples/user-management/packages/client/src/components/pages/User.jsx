import React from 'react';
import { Layout } from '../templates/Layout';

export const User = ({
  match: {
    params: { id: currentUserId = 'anonymous' },
  },
  users,
}) => {
  const { name = 'anonymous', id = 'anonymous' } =
    users.find(({ id }) => id === currentUserId) || {};

  if (id === 'anonymous') {
    return (
      <Layout title="User">
        <div>User not found!</div>
      </Layout>
    );
  }

  return (
    <Layout title="User">
      <p>User Content for ID {id}</p>
      <hr />
      <label>{name}</label>
    </Layout>
  );
};

export default User;
