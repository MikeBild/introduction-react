import React, { Fragment as F } from "react";
import Heading from "../components/Heading";
import Loading from "../components/Loading";

export default () => {
  return (
    <F>
      <Heading title="Welcome Mike">whats going on?</Heading>
      <Loading />
    </F>
  );
};
