import React from "react";
import styled from "styled-components";
import Link from "../atomics/Link";

function Footer({ className }) {
  return (
    <footer className={className}>
      Footer
      <Link>A</Link>
      <Link>B</Link>
    </footer>
  );
}

export default styled(Footer)`
  background-color: gray;
  padding: 10px;
`;
