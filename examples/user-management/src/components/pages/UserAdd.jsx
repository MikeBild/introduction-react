import React from 'react';
import { Layout } from '../templates/Layout';

export const UserAdd = ({ onAdd = () => {} }) => {
  return (
    <Layout title="User Add">
      <input type="text" id="name" />
      <button
        onClick={() => {
          console.log('anlegen');
          onAdd({
            name: 'Max Mustermann',
          });
        }}>
        Anlegen
      </button>
    </Layout>
  );
};

export default UserAdd;
