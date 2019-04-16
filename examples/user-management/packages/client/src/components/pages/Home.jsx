import React from 'react';
import { Layout } from '../templates/Layout';
import { UserTableRow } from '../organisms/UserTableRow';
import { UserAddPrimaryButton } from 'component-library';

export const Home = ({ users }) => {
  return (
    <Layout title="Home">
      <UserAddPrimaryButton>
        <strong>Add nwo</strong>
      </UserAddPrimaryButton>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserTableRow user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Home;
