import React from "react";
import styled from "styled-components";
import Footer from "./Footer";

const Header = styled.header`
  background-color: ${props => props.bgColor};
  padding: 10px;
`;

export function Layout({ children }) {
  return (
    <div>
      <Header bgColor="gray">Header</Header>
      <content>{children}</content>
      <Footer />
    </div>
  );
}
