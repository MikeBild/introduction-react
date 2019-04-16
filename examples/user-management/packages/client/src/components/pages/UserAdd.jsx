import React, { createRef } from 'react';
import { Layout } from '../templates/Layout';

export const UserAdd = ({ onAdd = () => {} }) => {
  const nameInput = createRef();
  return (
    <Layout title="User Add">
      <input type="text" ref={nameInput} />
      <button
        onClick={() => {
          const name = nameInput.current.value;

          onAdd({
            name,
          });
        }}>
        Anlegen
      </button>
    </Layout>
  );
};

export default UserAdd;
