import { hydrate } from "react-dom";
import React from "react";
import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";
import "isomorphic-fetch";

hydrate(
  <BrowserRouter>
    <App gists={window.__gists__} />
  </BrowserRouter>,
  document.getElementById("app")
);
