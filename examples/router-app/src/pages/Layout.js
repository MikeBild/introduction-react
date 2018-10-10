import React from 'react';
import { withRouter } from 'react-router-dom';
const Layout = ({ children }) => (
  <div>
    <header>header ...</header>
    <content>{children}</content>
    <footer>footer ...</footer>
  </div>
);

export default withRouter(Layout);
