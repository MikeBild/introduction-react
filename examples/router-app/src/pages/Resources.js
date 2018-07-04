import React from "react";
import { Link } from "react-router-dom";

const Resources = props => (
  <div>
    <h1>Resources</h1>
    <ul>
      {props.resources &&
        props.resources.map(resource => (
          <li key={resource}>
            {" "}
            <Link to={`/resources/${resource}`}>Link to {resource}</Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Resources;
