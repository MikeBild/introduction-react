import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../templates/Layout';
import { UserTableRow } from '../organisms/UserTableRow';

export const Home = ({ users }) => {
  return (
    <Layout title="Home">
      <Link to="/user/add">Add</Link>
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
