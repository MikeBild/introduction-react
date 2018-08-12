import React, { Fragment as F } from "react";
import Heading from "../components/Heading";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import styled from "styled-components";

const Root = styled("div")([], {
  padding: "48px"
});

const NavList = ({ data }) => (
  <ul>
    {data &&
      data.map(x => (
        <li key={x}>
          <a href={x}>{x}</a>
        </li>
      ))}
  </ul>
);

export default () => {
  return (
    <Root>
      <Heading title="Welcome Mike">whats going on?</Heading>
      <Loading />
      <Layout nav={data => <NavList data={data} />} />
    </Root>
  );
};
