import React from "react";
import { Link } from "react-router-dom";

const NoMatch = props => (
  <div>
    <h1>Page not found!</h1>
    <Link to="/">Jump to Home</Link>
  </div>
);

export default NoMatch;
