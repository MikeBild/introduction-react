import React from 'react';
import { Link } from 'react-router-dom';

const About = props => (
  <div>
    <h1>About</h1>
    <ul>
      <li>
        <Link to="/start">Home</Link>
      </li>
    </ul>
  </div>
);

export default About;
