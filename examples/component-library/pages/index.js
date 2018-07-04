import React, { Fragment as F } from "react";
import Heading from "../components/Heading";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const NavList = ({ data }) => (
  <ul>
    {data &&
      data.map(x => (
        <li>
          <a href={x}>{x}</a>
        </li>
      ))}
  </ul>
);

export default () => {
  return (
    <F>
      <Heading title="Welcome Mike">whats going on?</Heading>
      <Loading />
      <Layout nav={data => <NavList data={data} />} />
    </F>
  );
};
