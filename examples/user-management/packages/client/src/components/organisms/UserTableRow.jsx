import React from 'react';
import { Link } from 'react-router-dom';

export const UserTableRow = ({ user: { id, sex, name, birthdate } }) => (
  <tr>
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
);
