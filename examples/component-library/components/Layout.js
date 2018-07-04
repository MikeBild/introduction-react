import React, { Fragment as F } from "react";

export default ({ nav }) => {
  const data = ["1", "2", "3", "4"];
  return (
    <F>
      <header>Willkommen</header>
      <main />
      <nav>{nav && nav(data)}</nav>
      <footer />
    </F>
  );
};
