import React from "react";
import { Link } from "react-router-dom";

const Resource = props => (
  <div>
    <h1>Resource {props.match.params.id}</h1>
    <ul>
      <li>
        <Link to="/resources">Jump to Resources</Link>
      </li>
      <li>
        <Link to="/home">Jump to Home</Link>
      </li>
    </ul>
  </div>
);

export default Resource;
