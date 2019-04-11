import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../templates/Layout';
import users from '../../users.json';

export const Home = () => {
  return (
    <Layout title="Home">
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
          {users.map(({ id, sex, name, birthdate }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{sex}</td>
              <td>{birthdate}</td>
              <td>
                <>
                  <Link to={`/user/${id}`}>Change</Link>
                  <button>Delete</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Home;
