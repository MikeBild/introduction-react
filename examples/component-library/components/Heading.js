import React, { Fragment } from "react";
import styles from "./Heading.css";
import styled from "styled-components";
import Headline from "./Headline";

export default ({ title = "Welcome ...", children }) => {
  return (
    <Fragment>
      <Headline>{title}</Headline>
      <hr />
      <h2 style={{ color: "red" }} className="heading-subhead">
        {children}
      </h2>
    </Fragment>
  );
};
