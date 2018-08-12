import React, { Fragment } from "react";
import styled from "styled-components";
import Headline from "./Headline";

export default ({ title = "Welcome ...", children }) => {
  return (
    <Fragment>
      <Headline color="blue">{title}</Headline>
      <hr />
      <h2 style={{ color: "red" }}>{children}</h2>
    </Fragment>
  );
};
