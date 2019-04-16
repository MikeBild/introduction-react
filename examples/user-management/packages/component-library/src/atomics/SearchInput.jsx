import React, { useState } from 'react';
import PropTypes from 'prop-types';

SearchInput.propTypes = {
  data: PropTypes.array,
};

export function SearchInput({ data = [] }) {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <input type="search" onKeyUp={e => setSearchText(e.target.value)} />
      <ul>
        {data
          .filter(value => value.includes(searchText))
          .map(value => (
            <li key={value}>{value}</li>
          ))}
      </ul>
    </>
  );
}
