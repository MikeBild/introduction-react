import React, { Fragment } from "react";
import styles from "./Heading.css";

export default ({ title = "Welcome ...", children }) => {
  return (
    <Fragment>
      <h1>{title}</h1>
      <hr />
      <h2 style={{ color: "red" }} className="heading-subhead">
        {children}
      </h2>
    </Fragment>
  );
};
