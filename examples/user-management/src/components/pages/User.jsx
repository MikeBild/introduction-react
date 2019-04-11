import React from 'react';
import { Layout } from '../templates/Layout';

export const User = ({
  match: {
    params: { id = 'anonymous' },
  },
}) => {
  return (
    <Layout title="User">
      <p>User Content for ID {id}</p>
    </Layout>
  );
};

export default User;
